using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InternetAuction.API.Controllers
{
    [RoutePrefix("api/AuctionsCategories")]
    public class AuctionsCategoriesController : ApiController
    {
        [Inject]
        public IAuctionsCategoriesRepository AuctionsCategoriesRepository { get; set; }


        [HttpGet]
        [Route]
        public IHttpActionResult Get()
        {
            return Ok(AuctionsCategoriesRepository.GetAuctionCategories().ToList());
        }
    }
}
