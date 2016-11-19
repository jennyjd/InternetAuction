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
    public class AuctionCategoriesController : ApiController
    {
        [Inject]
        public IAuctionCategoriesRepository AuctionCategoriesRepository { get; set; }


        [HttpGet]
        public IEnumerable<object> GetAuctionCategories()
        {
            return AuctionCategoriesRepository.GetAuctionCategories().ToList();
        }
    }
}
