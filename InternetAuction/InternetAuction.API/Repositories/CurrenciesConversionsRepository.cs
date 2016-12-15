using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.DbContext;

namespace InternetAuction.API.Repositories
{
    public class CurrenciesConversionsRepository : ICurrenciesConversionsRepository
    {
        private readonly InternetAuctionDbContext _context;


        public CurrenciesConversionsRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public IEnumerable<CurrencyConversion> GetCurrenciesConversionsTable()
        {
            return _context.CurrenciesConversions;
        }


        public IEnumerable<CurrencyConversion> GetCurrenciesConversionsTable(int fromCurrencyId)
        {
            return _context.CurrenciesConversions.Where(x => x.FromCurrencyId == fromCurrencyId);
        }


        public CurrencyConversion GetCurrencyConversion(int fromCurrencyId, int toCurrencyId)
        {
            return _context.CurrenciesConversions.SingleOrDefault(x => x.FromCurrencyId == fromCurrencyId && x.ToCurrencyId == toCurrencyId);
        }
    }
}
