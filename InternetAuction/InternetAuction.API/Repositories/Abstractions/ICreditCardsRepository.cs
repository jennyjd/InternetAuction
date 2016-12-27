using InternetAuction.API.Models;
using System.Collections.Generic;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface ICreditCardsRepository
    {
        CreditCard GetCreditCard(int creditCardId);

        ICollection<CreditCard> GetCreditCards(bool withRemoved = false);

        ICollection<CreditCard> AddCreditCards(IEnumerable<CreditCard> creditCards);

        CreditCard RemoveCreditCards(int creditCardId);
    }
}
