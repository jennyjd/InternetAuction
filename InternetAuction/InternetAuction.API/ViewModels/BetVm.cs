using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.ViewModels
{
    public class BetVM
    {
        public int CreditCardId { get; set; }

        public float Sum { get; set; }

        public string Cvv { get; set; }
    }
}