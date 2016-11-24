using System.Threading.Tasks;
using InternetAuction.API.Repositories;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace InternetAuctionTests
{
    [TestClass]
    public class ClientsRepositoryTests
    {
        public IClientsRepository ClientRepository { get; set; } 


        [TestInitialize]
        public void TestInit()
        {
            ClientRepository = new ClientsRepository();
        }


        [TestMethod]
        public async Task AddClientTest()
        {
            var clientSignUpModel = new ClientSignUpVM
            {
                Email = "test@test.com",
                FirstName = "FirstName",
                LastName = "LastName",
                Patronymic = "Patronymic",
                Password = "h7g3qhgn29tg35yj"
            };

            var client = await ClientRepository.AddClient(clientSignUpModel);

            Assert.IsNotNull(client);
        }
    }
}
