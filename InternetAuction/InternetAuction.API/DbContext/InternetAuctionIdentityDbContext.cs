using System.Data.Entity;
using InternetAuction.API.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace InternetAuction.API.DbContext
{
    public class InternetAuctionIdentityDbContext : IdentityDbContext<InternetAuctionUser>
    {
        public InternetAuctionIdentityDbContext() : base("InternetAuction")
        {
            Database.SetInitializer(new IdentityDbInit());
        }


        public static InternetAuctionIdentityDbContext Create()
        {
            return new InternetAuctionIdentityDbContext();
        }
    }


    public class IdentityDbInit : DropCreateDatabaseIfModelChanges<IdentityDbContext>
    {
        protected override void Seed(IdentityDbContext context)
        {
            PerformInitialSetup(context);
            base.Seed(context);
        }


        public void PerformInitialSetup(IdentityDbContext context)
        {
        }
    }
}
