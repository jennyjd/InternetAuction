using System.Collections.Generic;
using System.Threading.Tasks;
using InternetAuction.API.DbContext;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;
using System.Linq;
using Ninject;

namespace InternetAuction.API.Repositories
{
    public class ClientsRepository : IClientsRepository
    {
        private readonly InternetAuctionDbContext _context;


        [Inject]
        public ICreditCardsRepository CreditCardsRepository { get; set; }


        public ClientsRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public IEnumerable<Client> GetClients()
        {
            return _context.Clients;
        }


        public Client GetClient(int clientId)
        {
            return _context.Clients.SingleOrDefault(client => client.Id == clientId);
        }


        public async Task<Client> AddClient(ClientSignUpVM clientSignUpModel)
        {
            var client = (Client) clientSignUpModel;
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            foreach(var creditCard in clientSignUpModel.CreditCards)
            {
                creditCard.UserId = client.Id;
            }
            client.CreditCards = CreditCardsRepository.AddCreditCards(clientSignUpModel.CreditCards);

            return client;
        }
    }
}