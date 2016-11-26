using System.ComponentModel.DataAnnotations;

namespace InternetAuction.API.ViewModels
{
    public class LoginModelVM
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}