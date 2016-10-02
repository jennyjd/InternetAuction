using System.ComponentModel.DataAnnotations;

namespace InternetAuction.API.ViewModels
{
    public class ClientSignUpModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Patronymic { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }
    }
}