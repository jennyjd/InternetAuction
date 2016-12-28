using Bank.API;
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
        [Route("GetCards/{withRemoved}")]
        public IHttpActionResult GetCards(bool withRemoved = false)
        {
            return Ok(CreditCardsRepository.GetCreditCards(withRemoved));
        }


        [HttpPost]
        [Route("DeleteCard/{creditCardId}")]
        public IHttpActionResult DeleteCard(int creditCardId)
        {
            var removedCard = CreditCardsRepository.RemoveCreditCards(creditCardId);
            if (removedCard == null)
            {
                return BadRequest("Can not delete credit card");
            }
            return Ok(removedCard);
        }


        [HttpPost]
        [Route("{clientId}")]
        public IHttpActionResult Post(int clientId, [FromBody]IEnumerable<CreditCard> creditCards)
        {
            var notValidCreditCards = new List<CreditCard>();
            foreach (var creditCard in creditCards)
            {
                creditCard.ClientId = clientId;
                if (!CreditCardsOperations.IsValidCreditCard(creditCard.Number))
                {
                    notValidCreditCards.Add(creditCard);
                }
            }

            if (notValidCreditCards.Any())
            {
                return Content(HttpStatusCode.BadRequest, notValidCreditCards);
            }

            return Ok(CreditCardsRepository.AddCreditCards(creditCards));
        }
    }
}
