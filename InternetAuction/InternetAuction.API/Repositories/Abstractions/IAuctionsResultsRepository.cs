using InternetAuction.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface IAuctionsResultsRepository
    {
        IEnumerable<AuctionResult> GetAuctionResults();

        IEnumerable<AuctionResult> GetAuctionResults(int clientId);

        void SeenAuctionsResults(int userId, ICollection<int> auctionsResultsIds);

        AuctionResult AddAuctionResult(AuctionResult auctionResult);
    }
}
