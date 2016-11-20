using InternetAuction.API.Infrastructure;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Ninject;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace InternetAuction.API.Controllers
{
    public class AuctionsController : ApiController
    {
        [Inject]
        public IAuctionsRepository AuctionsRepository { get; set; }


        [HttpGet]
        public IEnumerable<Auction> GetAuctions()
        {
            return AuctionsRepository.GetAuctions().ToList();
        }


        [HttpGet]
        public Auction GetAuction(int id)
        {
            return AuctionsRepository.GetAuction(id);
        }


        [Authorize]
        [HttpPost]
        public Auction AddAuction(Auction auction)
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                .GetUserManager<InternetAuctionUserManager>()
                .FindById(HttpContext.Current.User.Identity.GetUserId());

            auction.ClientId = user.ClientId.Value;

            return AuctionsRepository.AddAuction(auction);
        }
    }
}
