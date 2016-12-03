using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.Models
{
    public class GoodsState
    {
        public GoodsState()
        {
            Auctions = new List<Auction>();
        }


        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Auction> Auctions { get; set; }
    }
}