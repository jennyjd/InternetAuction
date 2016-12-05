using InternetAuction.API.Infrastructure;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Ninject;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace InternetAuction.API.Controllers
{
    [RoutePrefix("api/Auctions")]
    public class AuctionsController : ApiController
    {
        [Inject]
        public IAuctionsRepository AuctionsRepository { get; set; }


        [HttpGet]
        [Route]
        public IHttpActionResult Get()
        {
            return Ok(AuctionsRepository.GetAuctions().ToList());
        }


        [HttpGet]
        [Route("{auctionId}")]
        public IHttpActionResult Get(int auctionId)
        {
            return Ok(AuctionsRepository.GetAuction(auctionId));
        }


        [HttpGet]
        [Route("GetByClient/{clientId}")]
        public IHttpActionResult GetByClient(int clientId)
        {
            return Ok(AuctionsRepository.GetAuctionsByClientId(clientId));
        }


        [Authorize(Roles = "Client")]
        [HttpPost]
        [Route]
        public IHttpActionResult Post(Auction auction)
        {
            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                .GetUserManager<InternetAuctionUserManager>()
                .FindById(HttpContext.Current.User.Identity.GetUserId());

            auction.ClientId = user.ClientId.Value;

            return Ok(AuctionsRepository.AddAuction(auction));
        }
    }
}
