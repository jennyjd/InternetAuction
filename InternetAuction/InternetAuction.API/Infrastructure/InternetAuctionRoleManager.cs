using System;
using InternetAuction.API.DbContext;
using InternetAuction.API.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace InternetAuction.API.Infrastructure
{
    public class InternetAuctionRoleManager : RoleManager<InternetAuctionRole>, IDisposable
    {
        public InternetAuctionRoleManager(RoleStore<InternetAuctionRole> store) : base(store)
        {
        }


        public static InternetAuctionRoleManager Create(IdentityFactoryOptions<InternetAuctionRoleManager> options, IOwinContext context)
        {
            return new InternetAuctionRoleManager(new RoleStore<InternetAuctionRole>(context.Get<InternetAuctionIdentityDbContext>()));
        }
    }
}