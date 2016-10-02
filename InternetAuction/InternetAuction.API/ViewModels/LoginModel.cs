using System.ComponentModel.DataAnnotations;

namespace InternetAuction.API.ViewModels
{
    public class LoginModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}