﻿using Bank.API;
using InternetAuction.API.Infrastructure;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace InternetAuction.API.Controllers
{
    [RoutePrefix("api/Auctions")]
    public class AuctionsController : ApiController
    {
        [Inject]
        public IAuctionsRepository AuctionsRepository { get; set; }

        [Inject]
        public IAuctionsHistoryRepository AuctionsHistoryRepository { get; set; }

        [Inject]
        public ICreditCardsRepository CreditCardsRepository { get; set; }

        [Inject]
        public ICurrenciesConversionsRepository CurrenciesConversionsRepository { get; set; }

        [Inject]
        public IAuctionsResultsRepository AuctionsResultsRepository { get; set; }


        [HttpGet]
        [Route]
        public IHttpActionResult Get()
        {
            return Ok(AuctionsRepository.GetAuctions().ToList());
        }


        [HttpGet]
        [Route("{auctionId}")]
        public IHttpActionResult Get(int auctionId)
        {
            return Ok(AuctionsRepository.GetAuction(auctionId));
        }


        [HttpGet]
        [Route("GetByClient/{clientId}")]
        public IHttpActionResult GetByClient(int clientId)
        {
            return Ok(AuctionsRepository.GetAuctionsByClientId(clientId));
        }


        [Authorize(Roles = "Client")]
        [HttpPost]
        [Route]
        public IHttpActionResult Post(Auction auction)
        {
            if (auction.EndDate > DateTime.Now)
            {
                InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

                auction.ClientId = user.ClientId.Value;

                return Ok(AuctionsRepository.AddAuction(auction));
            }

            return BadRequest("Invalid Data");
        }


        [HttpGet]
        [Route("GetCurrentBet/{auctionId}")]
        public IHttpActionResult GetCurrentBet(int auctionId)
        {
            return Ok(AuctionsHistoryRepository.CheckCurrentMaxBet(auctionId));
        }


        [HttpGet]
        [Route("GetCurrentBetNew/{auctionId}")]
        public IHttpActionResult GetCurrentBetNew(int auctionId)
        {
            return Ok(AuctionsHistoryRepository.CheckCurrentMaxBetNew(auctionId));
        }


        [Authorize(Roles = "Client")]
        [HttpPost]
        [Route("BetNew/{auctionId}/{isFastSell}")]
        public IHttpActionResult BetNew(int auctionId, bool isFastSell, [FromBody]BetVM bet)
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            var auction = AuctionsRepository.GetAuction(auctionId);
            if (isFastSell && auction.PriceOfFastSell.HasValue)
            {
                bet.Sum = auction.PriceOfFastSell.Value;
            }
            var currentBet = AuctionsHistoryRepository.CheckCurrentMaxBetNew(auctionId);
            if (user.ClientId == auction.ClientId)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.OwnerCanNotMakeBet,
                    CurrentBet = currentBet
                });
            }
            if (isFastSell && !auction.PriceOfFastSell.HasValue)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.AuctionHasNotFastSellOption,
                    CurrentBet = currentBet
                });
            }
            if (auction.IsCompleted)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.AuctionCompleted,
                    CurrentBet = currentBet
                });
            }
            if (bet.Sum <= currentBet || bet.Sum < auction.StartPrice)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.SmallBet,
                    CurrentBet = currentBet
                });
            }

            var creditCard = CreditCardsRepository.GetCreditCard(bet.CreditCardId);
            if (creditCard.ValidTo < DateTime.Now)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.CreditCardExpired,
                    CurrentBet = currentBet
                });
            }
            var bankCardCurrency = CreditCardsOperations.GetCreditCardCurrency(creditCard.Number, bet.Cvv);
            if (bankCardCurrency == null)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.InvalidCreditCardData,
                    CurrentBet = currentBet
                });
            }

            var currencyConversionForReturn = CurrenciesConversionsRepository.GetCurrencyConversion(bankCardCurrency.Value, auction.CurrencyId);
            var currencyConversion = CurrenciesConversionsRepository.GetCurrencyConversion(auction.CurrencyId, bankCardCurrency.Value);
            var currentUserBet = AuctionsHistoryRepository.CheckCurrentUserBetNew(auctionId, user.ClientId.Value);

            decimal newBetSum = 0;
            decimal newCreditCardSum = 0;
            if (currentUserBet != null && currentUserBet.CreditCardId == creditCard.Id)
            {
                var newAddedSum = bet.Sum * currencyConversion.Rate - currentUserBet.CreditCardSum;
                newCreditCardSum = currentUserBet.CreditCardSum + newAddedSum;
                if (!CreditCardsOperations.TakeMoney(newAddedSum, creditCard.Number, bet.Cvv))
                {
                    return Content(HttpStatusCode.BadRequest, new BetResponseVM
                    {
                        Auction = auction,
                        State = BetState.NotEnoughMoney,
                        CurrentBet = currentBet
                    });
                }
            }
            else
            {
                var newAddedSum = bet.Sum * currencyConversion.Rate;
                newCreditCardSum = newAddedSum;
                if (!CreditCardsOperations.TakeMoney(newAddedSum, creditCard.Number, bet.Cvv))
                {
                    return Content(HttpStatusCode.BadRequest, new BetResponseVM
                    {
                        Auction = auction,
                        State = BetState.NotEnoughMoney,
                        CurrentBet = currentBet
                    });
                }

                if (currentUserBet != null)
                {
                    CreditCardsOperations.ReturnMoney(currentUserBet.CreditCardSum * currencyConversionForReturn.Rate, creditCard.Number);
                }
            }

            // check if currency conversion right

            var participantsIds = AuctionsHistoryRepository.GetParticipantsIds(auctionId);
            foreach (var id in participantsIds)
            {
                if (currentUserBet == null || id != currentUserBet.ClientId)
                {
                    var userBet = AuctionsHistoryRepository.CheckCurrentUserBetNew(auctionId, id);
                    if (userBet != null)
                    {
                        var card = CreditCardsRepository.GetCreditCard(userBet.CreditCardId);
                        CreditCardsOperations.ReturnMoney(userBet.CreditCardSum, card.Number);
                    }
                }
            }

            AuctionsHistoryRepository.AddBet(new AuctionHistory
            {
                AuctionId = auction.Id,
                ClientId = user.ClientId.Value,
                CreditCardId = bet.CreditCardId,
                CreditCardCurrencyId = bankCardCurrency.Value,
                CreditCardSum = newCreditCardSum,
                BetSum = bet.Sum,
                Date = DateTime.Now
            });

            if (isFastSell)
            {
                AuctionsRepository.CompleteAuction(auction.Id);
            }
            return Ok(new BetResponseVM
            {
                Auction = AuctionsRepository.GetAuction(auctionId),
                State = BetState.BetAccepted,
                CurrentBet = AuctionsHistoryRepository.CheckCurrentMaxBetNew(auctionId)
            });
        }


        [Authorize(Roles = "Client")]
        [HttpPost]
        [Route("Bet/{auctionId}/{isFastSell}")]
        public IHttpActionResult Bet(int auctionId, bool isFastSell, [FromBody]BetVM bet)
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            var auction = AuctionsRepository.GetAuction(auctionId);
            if (isFastSell && auction.PriceOfFastSell.HasValue)
            {
                bet.Sum = auction.PriceOfFastSell.Value;
            }
            var currentBet = AuctionsHistoryRepository.CheckCurrentMaxBet(auctionId);
            if (user.ClientId == auction.ClientId)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.OwnerCanNotMakeBet,
                    CurrentBet = currentBet
                });
            }
            if (isFastSell && !auction.PriceOfFastSell.HasValue)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.AuctionHasNotFastSellOption,
                    CurrentBet = currentBet
                });
            }
            if (auction.IsCompleted)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.AuctionCompleted,
                    CurrentBet = currentBet
                });
            }
            if (bet.Sum <= currentBet || bet.Sum < auction.StartPrice)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.SmallBet,
                    CurrentBet = currentBet
                });
            }

            var creditCard = CreditCardsRepository.GetCreditCard(bet.CreditCardId);
            var bankCardCurrency = CreditCardsOperations.GetCreditCardCurrency(creditCard.Number, bet.Cvv);
            if (bankCardCurrency == null)
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.InvalidCreditCardData,
                    CurrentBet = currentBet
                });
            }

            var currencyConversion = CurrenciesConversionsRepository.GetCurrencyConversion(auction.CurrencyId, bankCardCurrency.Value);
            var currentUserBet = AuctionsHistoryRepository.CheckCurrentUserBet(auctionId, user.ClientId.Value);
            var newAddedSum = bet.Sum - currentUserBet;
            var requestedSumFromBank = newAddedSum * currencyConversion.Rate;

            if (!CreditCardsOperations.TakeMoney(requestedSumFromBank, creditCard.Number, bet.Cvv))
            {
                return Content(HttpStatusCode.BadRequest, new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.NotEnoughMoney,
                    CurrentBet = currentBet
                });
            }


            AuctionsHistoryRepository.AddBet(new AuctionHistory
            {
                AuctionId = auction.Id,
                ClientId = user.ClientId.Value,
                CreditCardId = bet.CreditCardId,
                CreditCardCurrencyId = bankCardCurrency.Value,
                CreditCardSum = requestedSumFromBank,
                BetSum = newAddedSum,
                Date = DateTime.Now
            });

            if (isFastSell)
            {
                AuctionsRepository.CompleteAuction(auction.Id);
                // Set winner
            }
            return Ok(new BetResponseVM
            {
                Auction = AuctionsRepository.GetAuction(auctionId),
                State = BetState.BetAccepted,
                CurrentBet = AuctionsHistoryRepository.CheckCurrentMaxBet(auctionId)
            });
        }


        //================================================================
        [Authorize(Roles = "Client")]
        [HttpGet]
        [Route("GetAuctionsHistoryForParticipant")]
        public IHttpActionResult GetAuctionsHistoryForParticipant()
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            return Ok(AuctionsHistoryRepository.GetAuctionsHistoryForParticipant(user.ClientId.Value));
        }


        [Authorize(Roles = "Client")]
        [HttpGet]
        [Route("GetAuctionsHistoryForOwner")]
        public IHttpActionResult GetAuctionsHistoryForOwner()
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            return Ok(AuctionsHistoryRepository.GetAuctionsHistoryForOwner(user.ClientId.Value));
        }


        [Authorize(Roles = "Client")]
        [HttpGet]
        [Route("GetAuctionsResults")]
        public IHttpActionResult GetAuctionsResults()
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            return Ok(AuctionsResultsRepository.GetAuctionResults(user.ClientId.Value).Where(x => !x.IsSeenResult));
        }


        [Authorize(Roles = "Client")]
        [HttpPost]
        [Route("SeenAuctionResults")]
        public IHttpActionResult SeenAuctionResults(ICollection<int> auctionsResultsIds)
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            AuctionsResultsRepository.SeenAuctionsResults(user.ClientId.Value, auctionsResultsIds);
            return Ok();
        }


        [Authorize(Roles = "Administrator")]
        [HttpGet]
        [Route("GetAuctionsHistory")]
        public IHttpActionResult GetAuctionsHistory()
        {
            return Ok(AuctionsHistoryRepository.GetAuctionsHistoryForAuctions());
        }
        //================================================================


        [Authorize(Roles = "Client")]
        [HttpGet]
        [Route("GetAuctionsHistoryForParticipantNew")]
        public IHttpActionResult GetAuctionsHistoryForParticipantNew()
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            return Ok(AuctionsHistoryRepository.GetAuctionsHistoryForParticipantNew(user.ClientId.Value));
        }


        [Authorize(Roles = "Client")]
        [HttpGet]
        [Route("GetAuctionsHistoryForOwnerNew")]
        public IHttpActionResult GetAuctionsHistoryForOwnerNew()
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            return Ok(AuctionsHistoryRepository.GetAuctionsHistoryForOwnerNew(user.ClientId.Value));
        }


        [Authorize(Roles = "Client")]
        [HttpGet]
        [Route("GetMoney/{auctionId}/{creditCardId}")]
        public IHttpActionResult GetMoney(int auctionId, int creditCardId)
        {
            var maxBet = AuctionsHistoryRepository.CheckCurrentMaxBetNew(auctionId);
            var creditCard = CreditCardsRepository.GetCreditCard(creditCardId);
            var auction = AuctionsRepository.GetAuction(auctionId);
            var currencyId = CreditCardsOperations.GetCreditCardCurrency(creditCard.Number);
            if (currencyId != null)
            {
                var conversion = CurrenciesConversionsRepository.GetCurrencyConversion(auction.CurrencyId, currencyId.Value);
                var isOperationPerformed = CreditCardsOperations.GetMoney(creditCard.Number, maxBet * conversion.Rate);
                if (isOperationPerformed)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
