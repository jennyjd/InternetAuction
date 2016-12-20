using InternetAuction.API.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternetAuction.API.Models;
using InternetAuction.API.DbContext;
using Ninject;
using InternetAuction.API.Services;

namespace InternetAuction.API.Repositories
{
    public class AuctionsRepository : IAuctionsRepository
    {
        private readonly InternetAuctionDbContext _context;


        [Inject]
        public IAuctionsHistoryRepository AuctionsHistoryRepository { get; set; }

        [Inject]
        public IAuctionsResultsRepository AuctionsResultsRepository { get; set; }


        public AuctionsRepository()
        {
            _context = new InternetAuctionDbContext();
        }


        private void CheckIfAuctionsCompleted(IEnumerable<Auction> auctions)
        {
            foreach(var auction in auctions)
            {
                // TODO: check winner
                if (auction.EndDate <= DateTime.Now && !auction.IsCompleted)
                {
                    var clientsIds = AuctionsHistoryRepository.GetParticipantsIds(auction.Id);
                    /*
                     * clientId
                     * creditCardId
                     * SumId
                     */

                    foreach (var id in clientsIds)
                    {
                        AuctionsResultsRepository.AddAuctionResult(new AuctionResult
                        {
                            ClientId = id,
                            AuctionId = auction.Id,
                            IsSeenResult = false
                        });
                    }
                    AuctionsResultsRepository.AddAuctionResult(new AuctionResult
                    {
                        ClientId = auction.ClientId,
                        AuctionId = auction.Id,
                        IsSeenResult = false,
                        ChargeFromWin = AuctionsHistoryRepository.CheckCurrentMaxBet(auction.Id) * Constants.CHARGE_FROM_WIN
                    });

                    auction.IsCompleted = true;
                }
            }
        }


        public IEnumerable<Auction> GetAuctions()
        {
            CheckIfAuctionsCompleted(_context.Auctions);
            _context.SaveChanges();
            return _context.Auctions;
        }


        public Auction GetAuction(int auctionId)
        {
            CheckIfAuctionsCompleted(_context.Auctions);
            _context.SaveChanges();
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


        public Auction CompleteAuction(int auctionId)
        {
            var updatedAuction = _context.Auctions.SingleOrDefault(x => x.Id == auctionId);
            updatedAuction.IsCompleted = true;
            _context.SaveChanges();
            return updatedAuction;
        }


        public IEnumerable<Auction> GetAuctionsByClientId(int clientId)
        {
            CheckIfAuctionsCompleted(_context.Auctions);
            _context.SaveChanges();
            return _context.Auctions.Where(x => x.ClientId == clientId);
        }
    }
}