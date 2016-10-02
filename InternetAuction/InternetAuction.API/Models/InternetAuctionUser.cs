using Microsoft.AspNet.Identity.EntityFramework;

namespace InternetAuction.API.Models
{
    public class InternetAuctionUser : IdentityUser
    {
        public int? ClientId { get; set; }
    }
}