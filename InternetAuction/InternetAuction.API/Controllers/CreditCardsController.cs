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
    [RoutePrefix("api/CreditCards")]
    public class CreditCardsController : ApiController
    {
        [Inject]
        public ICreditCardsRepository CreditCardsRepository { get; set; }


        [HttpGet]
        [Route]
        public IHttpActionResult Get()
        {
            return Ok(CreditCardsRepository.GetCreditCards());
        }
    }
}
