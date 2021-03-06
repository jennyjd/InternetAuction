﻿using InternetAuction.API.Models;
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

        decimal CheckCurrentMaxBetNew(int auctionId);

        AuctionHistory CheckCurrentUserBetNew(int auctionId, int clientId);

        object GetAuctionsHistoryForParticipantNew(int clientId);

        object GetAuctionsHistoryForOwnerNew(int clientId);

        IEnumerable<int> GetCurrentAuctionsIdsForParticipantNew(int clientId, int creditCardId);
    }
}
