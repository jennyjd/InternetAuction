using Bank.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace Bank.API
{
    public class CreditCardsOperations
    {
        public static ICollection<CreditCard> creditCards = new List<CreditCard>
        {
            new CreditCard
            {
                CurrencyId = 1,
                Cvv = "1234",
                Number = "1282237041056833",
                Sum = 10000
            }
        };


        public static bool CheckCreditCard()
        {
            return true;
        }


        public static byte? GetCreditCardCurrency(string creditCardNumber, string cvv)
        {
            return creditCards.SingleOrDefault(x => x.Number == creditCardNumber && x.Cvv == cvv)?.CurrencyId;
        }


        public static bool TakeMoney(decimal sum, string creditCardNumber, string cvv)
        {
            return creditCards.SingleOrDefault(x => x.Number == creditCardNumber && x.Cvv == cvv && x.Sum >= sum) != null;
        }
    }
}
