using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.Models
{
    public class CurrencyConversion
    {
        public int Id { get; set; }

        public byte FromCurrencyId { get; set; }

        public byte ToCurrencyId { get; set; }

        public decimal Rate { get; set; }
    }
}