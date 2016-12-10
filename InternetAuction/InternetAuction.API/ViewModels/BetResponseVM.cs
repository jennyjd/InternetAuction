using InternetAuction.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.ViewModels
{
    public enum BetState
    {
        AuctionCompleted,
        SmallBet,
        BetAccepted
    }


    public class BetResponseVM
    {
        public BetState State { get; set; }

        public Auction Auction { get; set; }

        public decimal CurrentBet { get; set; }
    }
}