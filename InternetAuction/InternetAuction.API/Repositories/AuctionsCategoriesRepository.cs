using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.DbContext;

namespace InternetAuction.API.Repositories
{
    public class AuctionsCategoriesRepository : IAuctionsCategoriesRepository
    {
        private readonly InternetAuctionDbContext _context;


        public AuctionsCategoriesRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public IEnumerable<AuctionCategory> GetAuctionCategories()
        {
            return _context.AuctionsCategories;
        }
    }
}