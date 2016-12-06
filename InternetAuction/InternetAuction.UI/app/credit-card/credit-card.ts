export class CreditCard {
    id: number;
    number: string;
    owner: string;
    validMonth: string;
    validYear: string;
    currencyId: number;
    cash: number;
    clientId: number;

    constructor(res) {
        this.id = res.Id;
        this.number = this.splitNumber(res.Number);
        this.owner = this.combineName(res.OwnerFirstName, res.OwnerLastName);
        let date = this.formatDate(res.ValidTo); 
        this.validYear = date[0];
        this.validMonth = date[1];
        this.currencyId = res.CurrencyId;
        this.cash = res.Cash;
        this.clientId = res.ClientId;
    }

    splitNumber(num) {
        return (num.substring(0, 4) + ' ' + num.substring(4, 8) + ' ' + num.substring(8, 12) + ' ' + num.substring(12, 16))
    }

    combineName(firstName, lastName) {
        return (firstName + ' ' + lastName).toUpperCase()
    }

    formatDate(date) {
        return[date[2]+date[3], date[5]+date[6]]
    }
}