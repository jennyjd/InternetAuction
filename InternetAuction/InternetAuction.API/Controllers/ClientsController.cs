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
        [Route()]
        public IHttpActionResult Post(ClientSignUpVM client)
        {
            // TODO: throw error if login or email exists

            var newClient = ClientsRepository.AddClient(client);
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>();

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
