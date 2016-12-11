using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using InternetAuction.API.ViewModels;

namespace InternetAuction.IntegrationTests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var client = new HttpClient();
            var response = client.GetAsync("http://localhost/InternetAuctionApi/api/testapi/testmsg").Result;
            var content = response.Content.ReadAsStringAsync().Result;



            var content1 = JsonConvert.SerializeObject(new LoginModelVM
            {
                UserName = "Ivan",
                Password = "IvanIvan"
            }); 
            response = client.PostAsync("http://localhost/InternetAuctionApi/api/account/signin", new StringContent(content1, Encoding.UTF8, "application/json")).Result;

            content = response.Content.ReadAsStringAsync().Result;

            response = client.GetAsync("http://localhost/InternetAuctionApi/api/testapi/testauthorize").Result;
            content = response.Content.ReadAsStringAsync().Result;
            Console.WriteLine(content);
        }
    }
}
