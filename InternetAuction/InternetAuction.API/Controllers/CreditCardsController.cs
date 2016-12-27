using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;
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


        [HttpPost]
        [Route("{withRemoved}")]
        public IHttpActionResult Post(bool withRemoved = false)
        {
            return Ok(CreditCardsRepository.GetCreditCards(withRemoved));
        }


        [HttpPost]
        [Route("{creditCardId}")]
        public IHttpActionResult Post(int creditCardId)
        {
            return Ok(CreditCardsRepository.RemoveCreditCards(creditCardId));
        }


        [HttpPost]
        [Route("{clientId}")]
        public IHttpActionResult Post(int clientId, [FromBody]IEnumerable<CreditCard> creditCards)
        {
            foreach (var creditCard in creditCards)
            {
                creditCard.ClientId = clientId;
            }
            return Ok(CreditCardsRepository.AddCreditCards(creditCards));
        }
    }
}
