using System.Collections.Generic;

namespace InternetAuction.API.Models
{
    public class Client
    {
        public Client()
        {
            CreditCards = new List<CreditCard>();
        }


        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public ICollection<CreditCard> CreditCards { get; set; }
    }
}