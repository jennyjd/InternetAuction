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
    public class AuctionsController : ApiController
    {
        [Inject]
        public IAuctionsRepository AuctionsRepository { get; set; }


        [HttpGet]
        public IEnumerable<Auction> GetAuctions()
        {
            return AuctionsRepository.GetAuctions().ToList();
        }
    }
}
