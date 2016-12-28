using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.DbContext;

namespace InternetAuction.API.Repositories
{
    public class AuctionsResultsRepository : IAuctionsResultsRepository
    {
        private readonly InternetAuctionDbContext _context;


        public AuctionsResultsRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        public IEnumerable<AuctionResult> GetAuctionResults()
        {
            return _context.AuctionsResults;
        }


        public IEnumerable<AuctionResult> GetAuctionResults(int clientId)
        {
            return _context.AuctionsResults.Where(x => x.ClientId == clientId);
        }


        public AuctionResult AddAuctionResult(AuctionResult auctionResult)
        {
            _context.AuctionsResults.Add(auctionResult);
            _context.SaveChanges();
            return auctionResult;
        }


        public void SeenAuctionsResults(int userId, ICollection<int> auctionsResultsIds)
        {
            foreach (var austionResultId in auctionsResultsIds)
            {
                var auctionResult = _context.AuctionsResults.FirstOrDefault(x => x.ClientId == userId && x.Id == austionResultId);
                if (auctionResult != null)
                {
                    auctionResult.IsSeenResult = true;
                }
            }
            _context.SaveChanges();
        }
    }
}