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
        float CheckCurrentMaxBet(int auctionId);

        float CheckCurrentUserBet(int auctionId, int clientId);

        AuctionHistory AddBet(AuctionHistory auctionHistory);
    }
}
