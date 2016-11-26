using System.Threading.Tasks;
using InternetAuction.API.Models;
using System.Collections.Generic;
using InternetAuction.API.ViewModels.Clients;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface IClientsRepository
    {
        IEnumerable<Client> GetClients();

        Client AddClient(ClientSignUpVM clientSignUpModel);

        Client GetClient(int clientId);
    }
}
