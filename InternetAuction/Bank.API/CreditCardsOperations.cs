﻿using Bank.API.Models;
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
                Cvv = "123",
                Number = "1282237041056833",
                Sum = 10000
            },
            new CreditCard
            {
                CurrencyId = 2,
                Cvv = "234",
                Number = "7309400641159165",
                Sum = 10000
            },
            new CreditCard
            {
                CurrencyId = 1,
                Cvv = "789",
                Number = "6246746369166353",
                Sum = 1000
            },
            new CreditCard
            {
                CurrencyId = 1,
                Cvv = "234",
                Number = "3047580553634127",
                Sum = 1000
            },
            new CreditCard
            {
                CurrencyId = 1,
                Cvv = "345",
                Number = "1736656025872241",
                Sum = 10000000
            },
            new CreditCard
            {
                CurrencyId = 1,
                Cvv = "243",
                Number = "8722173641054006",
                Sum = 500
            }
        };


        public static CreditCard GetCreditCard(string number)
        {
            return creditCards.SingleOrDefault(x => x.Number == number);
        }


        public static byte? GetCreditCardCurrency(string creditCardNumber, string cvv)
        {
            return creditCards.SingleOrDefault(x => x.Number == creditCardNumber && x.Cvv == cvv)?.CurrencyId;
        }


        public static byte? GetCreditCardCurrency(string creditCardNumber)
        {
            return creditCards.SingleOrDefault(x => x.Number == creditCardNumber)?.CurrencyId;
        }


        public static bool TakeMoney(decimal sum, string creditCardNumber, string cvv)
        {
            var creditCard = creditCards.SingleOrDefault(x => x.Number == creditCardNumber && x.Cvv == cvv && x.Sum >= sum);
            if (creditCard != null)
            {
                creditCard.Sum -= sum;
                return true;
            }
            else
            {
                return false;
            }
        }


        public static bool ReturnMoney(decimal sum, string creditCardNumber)
        {
            var creditCard = creditCards.SingleOrDefault(x => x.Number == creditCardNumber);
            if (creditCard != null)
            {
                creditCard.Sum += sum;
                return true;
            }
            else
            {
                return false;
            }
        }


        public static bool IsValidCreditCard(string creditCardNumber)
        {
            if (creditCards.Any(x => x.Number == creditCardNumber))
            {
                return true;
            }
            return false;
        }


        public static bool GetMoney(string creditCardNumber, decimal sum)
        {
            var creditCard = creditCards.SingleOrDefault(x => x.Number == creditCardNumber);
            if (creditCard != null)
            {
                creditCard.Sum += sum;
                return true;
            }
            return false;
        }
    }
}
