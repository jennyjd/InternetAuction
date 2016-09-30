using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using Ninject;

namespace InternetAuction.API.Controllers
{
    public class TestApiController : ApiController
    {
        [Inject]
        public ICurrenciesRepository CurrenciesRepository { get; set; }


        [HttpGet]
        public ICollection<Currency> Test1()
        {
            return CurrenciesRepository.GetCurrencies().ToList();
        }
    }
}
