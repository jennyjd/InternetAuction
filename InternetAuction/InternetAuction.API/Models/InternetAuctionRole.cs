using Microsoft.AspNet.Identity.EntityFramework;

namespace InternetAuction.API.Models
{
    public class InternetAuctionRole : IdentityRole
    {
        public InternetAuctionRole()
        {
        }


        public InternetAuctionRole(string name) : base(name)
        {
        }
    }
}