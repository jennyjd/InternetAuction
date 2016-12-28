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

        public byte CreditCardCurrencyId { get; set; }

        public decimal CreditCardSum { get; set; }

        public decimal BetSum { get; set; }

        public DateTime Date { get; set; }
    }
}