namespace InternetAuction.API.Models
{
    public class CreditCard
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public decimal Cash { get; set; }
        public byte CurrensyId { get; set; }
        public int UserId { get; set; }
        public Client Client { get; set; }
        public Currency Currency { get; set; }
    }
}