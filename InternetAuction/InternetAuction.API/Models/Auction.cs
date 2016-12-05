using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.Models
{
    public class Auction
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal StartPrice { get; set; }

        public decimal? PriceOfFastSell { get; set; }

        public short CategoryId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public byte CurrencyId { get; set; }

        public int ClientId { get; set; }

        public int GoodStateId { get; set; }

        public bool IsCompleted { get; set; }

        public GoodsState GoodsState { get; set; }

        public Currency Currency { get; set; }
    }
}