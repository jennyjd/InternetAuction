using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.Models
{
    public class AuctionHistory
    {
        public int Id { get; set; }

        public int ClientId { get; set; }

        public int AuctionId { get; set; }

        public int CreditCardId { get; set; }

        public byte CurrencyId { get; set; }

        public float Sum { get; set; }

        public DateTime Date { get; set; }
    }
}