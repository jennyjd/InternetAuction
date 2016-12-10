using InternetAuction.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface ICurrenciesConversionsRepository
    {
        IEnumerable<CurrencyConversion> GetCurrenciesConversionsTable();

        IEnumerable<CurrencyConversion> GetCurrenciesConversionsTable(int fromCurrencyId);

        CurrencyConversion GetCurrencyConversion(int fromCurrencyId, int toCurrencyId);
    }
}
