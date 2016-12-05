using InternetAuction.API.Infrastructure;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Ninject;
using System;
using System.Linq;
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


        [Authorize(Roles = "Client")]
        [HttpPost]
        [Route("Bet/{auctionId}")]
        public IHttpActionResult Bet(int auctionId, [FromBody]BetVM bet)
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                    .GetUserManager<InternetAuctionUserManager>()
                    .FindById(HttpContext.Current.User.Identity.GetUserId());

            var auction = AuctionsRepository.GetAuction(auctionId);
            var currentBet = AuctionsHistoryRepository.CheckCurrentMaxBet(auctionId);
            if (auction.IsCompleted)
            {
                return Ok(new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.AuctionCompleted,
                    CurrentBet = currentBet
                });
            }
            if (bet.Sum <= currentBet)
            {
                return Ok(new BetResponseVM
                {
                    Auction = auction,
                    State = BetState.SmallBet,
                    CurrentBet = currentBet
                });
            }

            var currentUserBet = AuctionsHistoryRepository.CheckCurrentUserBet(auctionId, user.ClientId.Value);

            var requestedSumFromBank = bet.Sum - currentUserBet;

            // TODO: check CreditCard

            /*
             * 1. Check creditCard
             * 2. Get possible currencies
             * 3. Convert to some of them
             * 4. Request money
             */

            // TODO: return blocked sum and additioanl info (Currency of CreditCard)


            AuctionsHistoryRepository.AddBet(new AuctionHistory
            {
                AuctionId = auction.Id,
                ClientId = user.ClientId.Value,
                CreditCardId = bet.CreditCardId,
                CurrencyId = 1,  // TODO: use real from Bank response
                Sum = requestedSumFromBank,
                Date = DateTime.Now
            });


            return Ok(new BetResponseVM
            {
                Auction = AuctionsRepository.GetAuction(auctionId),
                State = BetState.AuctionCompleted,
                CurrentBet = currentBet
            });
        }
    }
}
