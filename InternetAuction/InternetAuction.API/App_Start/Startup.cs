using System.Web.Http;
using InternetAuction.API.DbContext;
using InternetAuction.API.Infrastructure;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

namespace InternetAuction.API
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configure(RoutesConfig.RegisterRoutes);
            GlobalConfiguration.Configure(FormattersConfig.RegisterFormatters);
            GlobalConfiguration.Configure(CorsConfig.RegisterCors);
            GlobalConfiguration.Configure(DependencyResolverConfig.RegisterDependencyResolver);

            app.CreatePerOwinContext(InternetAuctionIdentityDbContext.Create);
            app.CreatePerOwinContext<InternetAuctionUserManager>(InternetAuctionUserManager.Create);
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/api/Account/Login")
            });
        }
    }
}
