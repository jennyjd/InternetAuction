using System.Collections.Generic;
using InternetAuction.API.Models;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface ICurrenciesRepository
    {
        IEnumerable<Currency> GetCurrencies();
    }
}
