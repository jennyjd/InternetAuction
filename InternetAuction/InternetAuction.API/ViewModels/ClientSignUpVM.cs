using InternetAuction.API.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InternetAuction.API.ViewModels
{
    public class ClientSignUpVM
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Patronymic { get; set; }

        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        public ICollection<CreditCard> CreditCards { get; set; }
    }
}