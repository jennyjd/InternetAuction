using System;

namespace InternetAuction.API.Models
{
    public class CreditCard
    {
        public int Id { get; set; }

        public string Number { get; set; }

        public decimal? Cash { get; set; }

        public DateTime ValidTo { get; set; }

        public string OwnerFirstName { get; set; }

        public string OwnerLastName { get; set; }

        public byte? CurrencyId { get; set; }

        public int UserId { get; set; }

        public Client Client { get; set; }

        public Currency Currency { get; set; }
    }
}