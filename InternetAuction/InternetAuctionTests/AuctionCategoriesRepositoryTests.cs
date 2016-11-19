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
        public IAuctionCategoriesRepository AuctionCategoriesRepository { get; set; }


        [TestInitialize]
        public void TestInit()
        {
            AuctionCategoriesRepository = new AuctionCategoriesRepository();
        }


        [TestMethod]
        public void Get()
        {
            var categories = AuctionCategoriesRepository.GetAuctionCategories().ToList();
        }
    }
}
