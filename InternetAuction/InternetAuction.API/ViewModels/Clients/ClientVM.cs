using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.ViewModels.Clients
{
    public class ClientVM : ClientBase
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public string Email { get; set; }
    }
}