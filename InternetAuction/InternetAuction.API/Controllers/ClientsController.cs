using InternetAuction.API.Infrastructure;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Ninject;
using System;
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
        [Route()]
        public IHttpActionResult Get()
        {
            throw new NotImplementedException();
        }


        [AllowAnonymous]
        [HttpPost]
        [Route()]
        public IHttpActionResult Post(ClientSignUpVM client)
        {
            // error if login or email exists
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>();
            var roleManager = HttpContext.Current.GetOwinContext().Get<InternetAuctionRoleManager>();

            userManager.Create(new InternetAuctionUser
            {
                UserName = client.Login,
                Email = client.Email
            }, client.Password);
            userManager.AddToRole(userManager.FindByName(client.Login).Id, "Client");

            return Ok(ClientsRepository.AddClient(client));
        }
    }
}
