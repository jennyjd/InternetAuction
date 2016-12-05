using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.DbContext;

namespace InternetAuction.API.Repositories
{
    public class GoodsSateRepository : IGoodsSateRepository
    {
        private readonly InternetAuctionDbContext _context;


        public GoodsSateRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public IEnumerable<GoodsState> GetGoodsStates()
        {
            return _context.GoodStates;
        }
    }
}