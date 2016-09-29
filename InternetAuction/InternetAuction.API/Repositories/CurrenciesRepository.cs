using System.Collections.Generic;
using InternetAuction.API.DbContext;
using InternetAuction.API.Models;

namespace InternetAuction.API.Repositories
{
    public class CurrenciesRepository
    {
        private readonly InternetAuctionDatabaseContext _context;

        public CurrenciesRepository()
        {
            _context = new InternetAuctionDatabaseContext();
        }


        public IEnumerable<Currency> GetCurrencies => _context.Currencies;
    }
}