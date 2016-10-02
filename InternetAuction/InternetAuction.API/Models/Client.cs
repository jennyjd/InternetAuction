using System.Collections.Generic;
using InternetAuction.API.ViewModels;

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


        public static explicit operator Client(ClientSignUpModel client)
        {
            return new Client
            {
                FirstName = client.FirstName,
                LastName = client.LastName,
                Patronymic = client.Patronymic
            };
        }
    }
}