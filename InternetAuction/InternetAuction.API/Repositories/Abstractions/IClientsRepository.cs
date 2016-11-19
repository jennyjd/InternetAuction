using System.Threading.Tasks;
using InternetAuction.API.Models;
using InternetAuction.API.ViewModels;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface IClientsRepository
    {
        Task<Client> Add(ClientSignUpModel clientSignUpModel);
    }
}
