using InternetAuction.API.Models;
using InternetAuction.API.ViewModels.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.Infrastructure.Swagger.Examples
{
    public interface IExamplesProvider
    {
        object GetExamples();
    }


    public class ClientExample : IExamplesProvider
    {
        public object GetExamples()
        {
            return new ClientSignUpVM
            {
                FirstName = "FirstName"
            };
            //return new ClientSignUpVM
            //{
            //    FirstName = "FirstName",
            //    LastName = "LastName",
            //    Patronymic = null,
            //    Login = "NewLogin",
            //    Password = "Password",
            //    Email = "Email"
            //};
        }
    }
}