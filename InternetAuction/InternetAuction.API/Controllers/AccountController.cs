using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using InternetAuction.API.Infrastructure;
using InternetAuction.API.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace InternetAuction.API.Controllers
{
    public class AccountController : ApiController
    {
        [HttpPost]
        public async Task Login(LoginModel loginModel)
        {
            var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>();
            var user = await userManager.FindAsync(loginModel.UserName, loginModel.Password);
            authenticationManager.SignIn(await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie));
        }


        [HttpGet]
        public void SignOut()
        {
            HttpContext.Current.GetOwinContext().Authentication.SignOut();
        }
    }
}
