using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.DbContext;

namespace InternetAuction.API.Repositories
{
    public class AuctionsRepository : IAuctionsRepository
    {
        private readonly InternetAuctionDbContext _context;


        public AuctionsRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public IEnumerable<Auction> GetAuctions()
        {
            return _context.Auctions;
        }


        public Auction GetAuction(int auctionId)
        {
            return _context.Auctions.SingleOrDefault(x => x.Id == auctionId);
        }

        public Auction AddAuction(Auction auction)
        {
            auction.StartDate = DateTime.UtcNow;
            _context.Auctions.Add(auction);
            _context.SaveChanges();
            return auction;
        }
    }
}