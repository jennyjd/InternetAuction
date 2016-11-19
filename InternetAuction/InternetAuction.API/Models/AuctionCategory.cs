using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.Models
{
    public class AuctionCategory
    {
        public short Id { get; set; }

        public string Name { get; set; }

        public short? ParentAuctionCategoryId { get; set; }

        public AuctionCategory ParentAuctionCategory { get; set; }

        public ICollection<AuctionCategory> SubAuctionCategories { get; set; }


        public AuctionCategory()
        {
            SubAuctionCategories = new List<AuctionCategory>();
        }
    }
}