﻿using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.DbContext;
using Ninject;

namespace InternetAuction.API.Repositories
{
    public class CreditCardsRepository : ICreditCardsRepository
    {
        private readonly InternetAuctionDbContext _context;


        [Inject]
        public IAuctionsHistoryRepository AuctionsHistoryRepository { get; set; }


        public CreditCardsRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public CreditCard GetCreditCard(int creditCardId)
        {
            return _context.CreditCards.Single(x => x.Id == creditCardId);
        }


        public ICollection<CreditCard> GetCreditCards(bool withRemoved = false)
        {
            return _context.CreditCards.Where(x => x.IsRemoved != true || withRemoved).ToList();
        }


        public ICollection<CreditCard> AddCreditCards(IEnumerable<CreditCard> creditCards)
        {
            _context.CreditCards.AddRange(creditCards);
            _context.SaveChanges();
            return creditCards.ToList();
        }


        public CreditCard RemoveCreditCards(int creditCardId)
        {
            var creditCard = _context.CreditCards.SingleOrDefault(x => x.Id == creditCardId);

            var auctionHistories = AuctionsHistoryRepository.GetCurrentAuctionsIdsForParticipantNew(creditCard.ClientId, creditCardId);
            if (auctionHistories == null || auctionHistories.Any())
            {
                return null;
            }

            creditCard.IsRemoved = true;
            _context.SaveChanges();
            return creditCard;
        }
    }
}