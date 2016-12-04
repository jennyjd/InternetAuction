using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using InternetAuction.API.Infrastructure;
using InternetAuction.API.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Ninject;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels.Clients;

namespace InternetAuction.API.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        [Inject]
        public IClientsRepository ClientsRepository { get; set; }


        [HttpPost]
        [Route("SignIn")]
        public async Task<IHttpActionResult> SignIn(LoginModelVM loginModel)
        {
            var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>();
            var user = await userManager.FindAsync(loginModel.UserName, loginModel.Password);
            authenticationManager.SignOut();
            authenticationManager.SignIn(await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie));

            if (user.ClientId.HasValue)
            {
                var client = ClientsRepository.GetClient(user.ClientId.Value);
                return Ok(new ClientVM
                {
                    ClientId = client.Id,
                    FirstName = client.FirstName,
                    LastName = client.LastName,
                    Patronymic = client.Patronymic,
                    Email = user.Email
                });
            }
            else
            {
                return Ok(new AdministratorVM
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email
                });
            }
        }


        [Authorize]
        [HttpGet]
        [Route("SignOut")]
        public void SignOut()
        {
            HttpContext.Current.GetOwinContext().Authentication.SignOut();
        }
    }
}
