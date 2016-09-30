using InternetAuction.API.DbContext;
using InternetAuction.API.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace InternetAuction.API.Infrastructure
{
    public class InternetAuctionUserManager : UserManager<InternetAuctionUser>
    {
        public InternetAuctionUserManager(IUserStore<InternetAuctionUser> store) : base(store)
        {
        }


        public static InternetAuctionUserManager Create(IdentityFactoryOptions<InternetAuctionUserManager> options, IOwinContext owinContext)
        {
            var context = owinContext.Get<InternetAuctionIdentityDbContext>();
            var manager = new InternetAuctionUserManager(new UserStore<InternetAuctionUser>(context));
            return manager;
        }
    }
}