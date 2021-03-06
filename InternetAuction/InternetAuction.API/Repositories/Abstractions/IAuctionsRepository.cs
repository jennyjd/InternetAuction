﻿using InternetAuction.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface IAuctionsRepository
    {
        IEnumerable<Auction> GetAuctions();

        IEnumerable<Auction> GetAuctionsByClientId(int clientId);

        Auction GetAuction(int id);

        Auction AddAuction(Auction auction);

        Auction CompleteAuction(int auctionId);
    }
}
