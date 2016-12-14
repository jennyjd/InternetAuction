using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank.API.Models
{
    public class CreditCard
    {
        public byte CurrencyId { get; set; }

        public string Number { get; set; }

        public string Cvv { get; set; }

        public decimal Sum { get; set; }
    }
}
