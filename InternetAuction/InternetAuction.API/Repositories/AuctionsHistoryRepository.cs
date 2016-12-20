using InternetAuction.API.DbContext;
using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using Ninject;

namespace InternetAuction.API.Repositories
{
    public class AuctionsHistoryRepository : IAuctionsHistoryRepository
    {
        private readonly InternetAuctionDbContext _context;


        [Inject]
        public IAuctionsRepository AuctionsRepository { get; set; }


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


        public object GetAuctionsHistoryForParticipant(int clientId)
        {
            var auctionsHistory = _context.AuctionsHistory.Where(x => x.ClientId == clientId).GroupBy(x => x.AuctionId);
            if (!auctionsHistory.Any())
            {
                return null;
            }
            var list = new List<object>();

            foreach (var history in auctionsHistory)
            {
                var auction = AuctionsRepository.GetAuction(history.Key);
                list.Add(new
                {
                    AuctionId = auction.Id,
                    CurrencyId = auction.CurrencyId,
                    IsCompleted = auction.IsCompleted,
                    UserBet = CheckCurrentUserBet(auction.Id, clientId),
                    MaxBet = CheckCurrentMaxBet(auction.Id),
                    IsWinner = auction.IsCompleted && CheckCurrentUserBet(auction.Id, clientId) == CheckCurrentMaxBet(auction.Id) ? true : false
                });
            }

            return list;
        }


        public object GetAuctionsHistoryForOwner(int clientId)
        {
            var auctions = AuctionsRepository.GetAuctions().Where(x => x.ClientId == clientId);
            if (!auctions.Any())
            {
                return null;
            }
            var list = new List<object>();

            foreach (var auction in auctions)
            {
                list.Add(new
                {
                    AuctionId = auction.Id,
                    IsCompleted = auction.IsCompleted,
                    MaxBet = CheckCurrentMaxBet(auction.Id)
                });
            }

            return list;
        }
    }
}