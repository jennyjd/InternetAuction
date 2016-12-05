using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank.API
{
    public class TakeMoneyBankResponse
    {
        public float Sum { get; set; }

        public string CreditCardNumber { get; set; }


    }

    public class CreditCardsOperations
    {
        public static bool CheckCreditCard()
        {
            return true;
        }


        public static bool TakeMoney(float sum, string creditCardNumber, string cvv)
        {
            return true;
        }
    }
}
