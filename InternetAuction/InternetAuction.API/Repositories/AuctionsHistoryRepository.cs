using InternetAuction.API.DbContext;
using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;

namespace InternetAuction.API.Repositories
{
    public class AuctionsHistoryRepository : IAuctionsHistoryRepository
    {
        private readonly InternetAuctionDbContext _context;


        public AuctionsHistoryRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public AuctionHistory AddBet(AuctionHistory auctionHistory)
        {
            _context.AuctionsHistory.Add(auctionHistory);
            _context.SaveChanges();
            return auctionHistory;
        }


        public decimal CheckCurrentMaxBet(int auctionId)
        {
            var lastBet = _context.AuctionsHistory.Where(x => x.AuctionId == auctionId).OrderBy(x => x.Date).AsEnumerable().LastOrDefault();
            return lastBet == null ? 0 : _context.AuctionsHistory.Where(x => x.ClientId == lastBet.ClientId && x.AuctionId == auctionId).Sum(x => x.BetSum);
        }


        public decimal CheckCurrentUserBet(int auctionId, int clientId)
        {
            var auctionHistory = _context.AuctionsHistory.Where(x => x.ClientId == clientId && x.AuctionId == auctionId);
            if (auctionHistory.Any())
            {
                return auctionHistory.Sum(x => x.BetSum);
            }
            return 0;
        }


        public IEnumerable<int> GetParticipantsIds(int auctionId)
        {
            return _context.AuctionsHistory.Where(x => x.AuctionId == auctionId).GroupBy(x => x.ClientId).Select(x => x.Key);
        }
    }
}