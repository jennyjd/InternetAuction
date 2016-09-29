using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories;

namespace InternetAuction.API.Controllers
{
    public class TestApiController : ApiController
    {
        [HttpGet]
        public ICollection<Currency> Test1()
        {
            return new CurrenciesRepository().GetCurrencies.ToList();
        }
    }
}
