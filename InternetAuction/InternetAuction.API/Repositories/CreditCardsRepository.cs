using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.DbContext;

namespace InternetAuction.API.Repositories
{
    public class CreditCardsRepository : ICreditCardsRepository
    {
        private readonly InternetAuctionDbContext _context;


        public CreditCardsRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public ICollection<CreditCard> AddCreditCards(IEnumerable<CreditCard> creditCards)
        {
            _context.CreditCards.AddRange(creditCards);
            _context.SaveChanges();
            return creditCards.ToList();
        }
    }
}