using InternetAuction.API.DbContext;
using InternetAuction.API.Infrastructure;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Cookies;
using Owin;

namespace InternetAuction.API
{
    public class IdentityConfig
    {
        public static void RegisterIdentity(IAppBuilder app)
        {
            app.CreatePerOwinContext(InternetAuctionIdentityDbContext.Create);
            app.CreatePerOwinContext<InternetAuctionUserManager>(InternetAuctionUserManager.Create);
            app.CreatePerOwinContext<InternetAuctionRoleManager>(InternetAuctionRoleManager.Create);
            app.UseCors(CorsOptions.AllowAll);
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie
                //,
                //Provider = new CookieAuthenticationProvider()
            });
        }
    }
}