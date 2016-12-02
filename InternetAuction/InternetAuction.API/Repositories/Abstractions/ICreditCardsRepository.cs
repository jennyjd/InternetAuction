using InternetAuction.API.Models;
using System.Collections.Generic;

namespace InternetAuction.API.Repositories.Abstractions
{
    public interface ICreditCardsRepository
    {
        ICollection<CreditCard> GetCreditCards();
        ICollection<CreditCard> AddCreditCards(IEnumerable<CreditCard> creditCards);
    }
}
