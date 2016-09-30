using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using InternetAuction.API.Infrastructure;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using Microsoft.AspNet.Identity.Owin;
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
            var users = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>().Users.ToList();
            return CurrenciesRepository.GetCurrencies().ToList();
        }
    }
}
