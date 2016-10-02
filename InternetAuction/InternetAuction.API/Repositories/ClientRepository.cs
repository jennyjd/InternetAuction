using System.Collections.Generic;
using System.Threading.Tasks;
using InternetAuction.API.DbContext;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;

namespace InternetAuction.API.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly InternetAuctionDbContext _context;


        public ClientRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public IEnumerable<Client> GetClients()
        {
            return _context.Clients;
        }


        public async Task<Client> Add(ClientSignUpModel clientSignUpModel)
        {
            var client = (Client) clientSignUpModel;
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return client;
        }
    }
}