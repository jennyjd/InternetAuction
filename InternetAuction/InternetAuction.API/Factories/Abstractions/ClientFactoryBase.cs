using InternetAuction.API.Models;
using InternetAuction.API.ViewModels.Clients;

namespace InternetAuction.API.Factories.Abstractions
{
    public abstract class ClientFactoryBase
    {
        public abstract Client CreateClient(ClientBase client);
    }
}
