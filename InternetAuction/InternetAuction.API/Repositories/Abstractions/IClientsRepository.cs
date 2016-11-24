using System.Threading.Tasks;
using InternetAuction.API.Models;
using InternetAuction.API.ViewModels;
using System.Collections.Generic;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface IClientsRepository
    {
        IEnumerable<Client> GetClients();

        Task<Client> AddClient(ClientSignUpVM clientSignUpModel);

        Client GetClient(int clientId);
    }
}
