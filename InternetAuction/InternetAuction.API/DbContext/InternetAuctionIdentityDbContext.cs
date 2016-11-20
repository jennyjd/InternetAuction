using System.Collections.Generic;
using System.Data.Entity;
using InternetAuction.API.Infrastructure;
using InternetAuction.API.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace InternetAuction.API.DbContext
{
    public class InternetAuctionIdentityDbContext : IdentityDbContext<InternetAuctionUser>
    {
        public InternetAuctionIdentityDbContext() : base("InternetAuction")
        {
            //Database.SetInitializer<InternetAuctionIdentityDbContext>(new IdentityDbInit());
        }


        public static InternetAuctionIdentityDbContext Create()
        {
            return new InternetAuctionIdentityDbContext();
        }
    }


    //public class IdentityDbInit : DropCreateDatabaseIfModelChanges<InternetAuctionIdentityDbContext>
    //{
    //    protected override void Seed(InternetAuctionIdentityDbContext context)
    //    {
    //        PerformInitialSetup(context);
    //        base.Seed(context);
    //    }


    //    public void PerformInitialSetup(InternetAuctionIdentityDbContext context)
    //    {
    //        var userManager = new InternetAuctionUserManager(new UserStore<InternetAuctionUser>(context));
    //        var roleManager = new InternetAuctionRoleManager(new RoleStore<InternetAuctionRole>(context));

    //        new List<InternetAuctionRole>
    //        {
    //            new InternetAuctionRole("Client"),
    //            new InternetAuctionRole("Administrator")
    //        }.ForEach(role => roleManager.Create(role));

    //        new List<InternetAuctionUser>
    //        {
    //            new InternetAuctionUser
    //            {
    //                UserName = "Jan",
    //                Email = "jan@ia.com"
    //            },
    //            new InternetAuctionUser
    //            {
    //                UserName = "Jenny",
    //                Email = "jenny@ia.com"
    //            }
    //        }.ForEach(user =>
    //        {
    //            userManager.Create(user, "InternetAuction");
    //            userManager.AddToRole(userManager.FindByName(user.UserName).Id, "Administrator");
    //        });

    //        new List<InternetAuctionUser>
    //        {
    //            new InternetAuctionUser
    //            {
    //                UserName = "Client",
    //                Email = "client@ia.com"
    //            }
    //        }.ForEach(user =>
    //        {
    //            userManager.Create(user, "InternetAuction");
    //            userManager.AddToRole(userManager.FindByName(user.UserName).Id, "Client");
    //        });
    //    }
    //}
}
