using InternetAuction.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface IAuctionCategoriesRepository
    {
        IEnumerable<AuctionCategory> GetAuctionCategories();
    }
}