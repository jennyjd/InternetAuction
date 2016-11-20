using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using InternetAuction.API.Repositories.Abstractions;
using InternetAuction.API.Repositories;
using System.Linq;

namespace InternetAuctionTests
{
    [TestClass]
    public class AuctionCategoriesRepositoryTests
    {
        public IAuctionsCategoriesRepository AuctionCategoriesRepository { get; set; }


        [TestInitialize]
        public void TestInit()
        {
            AuctionCategoriesRepository = new AuctionsCategoriesRepository();
        }


        [TestMethod]
        public void Get()
        {
            var categories = AuctionCategoriesRepository.GetAuctionCategories().ToList();
        }
    }
}
