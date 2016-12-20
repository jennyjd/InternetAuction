using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.Models
{
    public class AuctionResult
    {
        public int Id { get; set; }

        public int ClientId { get; set; }

        public int AuctionId { get; set; }

        public bool IsSeenResult { get; set; }

        public decimal? ChargeFromWin { get; set; }
    }
}