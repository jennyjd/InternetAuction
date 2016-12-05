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
            return _context.Auctions.Include("GoodsState").Include("Currency").SingleOrDefault(x => x.Id == auctionId);
        }


        public Auction AddAuction(Auction auction)
        {
            auction.IsCompleted = false;
            auction.StartDate = DateTime.UtcNow;
            _context.Auctions.Add(auction);
            _context.SaveChanges();
            return GetAuction(auction.Id);
        }


        public IEnumerable<Auction> GetAuctionsByClientId(int clientId)
        {
            return _context.Auctions.Where(x => x.ClientId == clientId);
        }
    }
}