using Bank.API;
using InternetAuction.API.Infrastructure;
using InternetAuction.API.Infrastructure.Swagger;
using InternetAuction.API.Infrastructure.Swagger.Examples;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;
using InternetAuction.API.ViewModels.Clients;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Ninject;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;

namespace InternetAuction.API.Controllers
{
    [RoutePrefix("api/Clients")]
    public class ClientsController : ApiController
    {
        [Inject]
        public IClientsRepository ClientsRepository { get; set; }


        [HttpGet]
        [Route("{clientId}")]
        public IHttpActionResult Get(int clientId)
        {
            return Ok(ClientsRepository.GetClient(clientId));
        }


        [HttpGet]
        [Route("GetClientAccount/{clientId}")]
        public IHttpActionResult GetClientAccount(int clientId)
        {
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>();
            var user = userManager.Users.SingleOrDefault(x => x.ClientId == clientId);

            return Ok(new
            {
                ClientId = user.ClientId,
                Email = user.Email,
                UserName = user.UserName
            });
        }


        /// <summary>
        /// Used for clients registration in the system
        /// </summary>
        /// <param name="client">Represents client model with his credit cards</param>
        /// <returns>Returns created client</returns>
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(Client))]
        //[SwaggerRequestExamples(typeof(ClientSignUpVM), typeof(ClientExample))]
        //[SwaggerResponseExamples(typeof(ClientSignUpVM), typeof(ClientExample))]
        [AllowAnonymous]
        [HttpPost]
        [Route]
        public IHttpActionResult Post(ClientSignUpVM client)
        {
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>();
            if (userManager.FindByEmail(client.Email) != null || userManager.FindByName(client.Login) != null)
            {
                return BadRequest("User with this email or user name exists");
            };

            var notValidCreditCards = new List<CreditCard>();
            foreach (var creditCard in client.CreditCards)
            {
                if (!CreditCardsOperations.IsValidCreditCard(creditCard.Number))
                {
                    notValidCreditCards.Add(creditCard);
                }
            }

            if (notValidCreditCards.Any())
            {
                return Content(HttpStatusCode.BadRequest, notValidCreditCards);
            }

            var newClient = ClientsRepository.AddClient(client);

            var identityResult = userManager.Create(new InternetAuctionUser
            {
                UserName = client.Login,
                Email = client.Email,
                ClientId = newClient.Id
            }, client.Password);

            if (identityResult.Errors.Any())
            {
                // TODO: handle identity errors
                throw new Exception("Identity error");
            }

            userManager.AddToRole(userManager.FindByName(client.Login).Id, "Client");

            return Ok(newClient);
        }
    }
}
