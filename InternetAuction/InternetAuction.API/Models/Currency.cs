using System.Collections.Generic;

namespace InternetAuction.API.Models
{
    public class Currency
    {
        public Currency()
        {
            CreditCards = new List<CreditCard>();
        }


        public byte Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public ICollection<CreditCard> CreditCards { get; set; }
    }
}