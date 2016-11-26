using System.Collections.Generic;
using System.Threading.Tasks;
using InternetAuction.API.DbContext;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;
using System.Linq;
using Ninject;
using InternetAuction.API.ViewModels.Clients;
using InternetAuction.API.Factories.Abstractions;
using InternetAuction.API.Factories;

namespace InternetAuction.API.Repositories
{
    public class ClientsRepository : IClientsRepository
    {
        private readonly InternetAuctionDbContext _context;
        private readonly ClientFactoryBase _clientFactory;


        [Inject]
        public ICreditCardsRepository CreditCardsRepository { get; set; }


        public ClientsRepository()
        {
            _context = new InternetAuctionDbContext();
            _clientFactory = new ClientSignUpFactory();
        }


        public IEnumerable<Client> GetClients()
        {
            return _context.Clients;
        }


        public Client GetClient(int clientId)
        {
            return _context.Clients.Include("CreditCards").SingleOrDefault(client => client.Id == clientId);
        }


        public Client AddClient(ClientSignUpVM clientSignUpModel)
        {
            var client = _clientFactory.CreateClient(clientSignUpModel);
            _context.Clients.Add(client);
            _context.SaveChanges();

            foreach (var creditCard in clientSignUpModel.CreditCards)
            {
                creditCard.UserId = client.Id;
            }
            client.CreditCards = CreditCardsRepository.AddCreditCards(clientSignUpModel.CreditCards);

            return client;
        }
    }
}