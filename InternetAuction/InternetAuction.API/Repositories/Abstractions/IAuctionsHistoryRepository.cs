using InternetAuction.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface IAuctionsHistoryRepository
    {
        decimal CheckCurrentMaxBet(int auctionId);

        decimal CheckCurrentUserBet(int auctionId, int clientId);

        AuctionHistory AddBet(AuctionHistory auctionHistory);

        IEnumerable<int> GetParticipantsIds(int auctionId);

        object GetAuctionsHistoryForParticipant(int clientId);

        object GetAuctionsHistoryForOwner(int clientId);

        object GetAuctionsHistoryForAuctions();
    }
}
