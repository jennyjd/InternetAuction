using System.Collections.Generic;
using InternetAuction.API.DbContext;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;

namespace InternetAuction.API.Repositories
{
    public class CurrenciesRepository : ICurrenciesRepository
    {
        private readonly InternetAuctionDatabaseContext _context;


        public CurrenciesRepository()
        {
            _context = new InternetAuctionDatabaseContext();
        }


        public IEnumerable<Currency> GetCurrencies()
        {
            return _context.Currencies;
        }
    }
}