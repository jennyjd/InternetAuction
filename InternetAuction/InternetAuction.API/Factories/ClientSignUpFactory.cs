using InternetAuction.API.Factories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.ViewModels.Clients;

namespace InternetAuction.API.Factories
{
    public class ClientSignUpFactory : ClientFactoryBase
    {
        public override Client CreateClient(ClientBase client)
        {
            var clientSignUpVM = client as ClientSignUpVM;
            if(clientSignUpVM != null)
            {
                return new Client
                {
                    FirstName = clientSignUpVM.FirstName,
                    LastName = clientSignUpVM.LastName,
                    Patronymic = clientSignUpVM.Patronymic
                };
            }
            return null;
        }
    }
}