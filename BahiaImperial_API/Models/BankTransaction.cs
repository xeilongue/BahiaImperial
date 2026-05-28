namespace BahiaImperial_API.Models
{
    public enum TransactionType
    {
        Deposit = 0,
        Withdraw = 1
    }
    public class BankTransaction
    {

        // ATRIBUTOS
        public int Id { get; set; }
        public TransactionType Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime TrDate { get; set; }

        // FOREIGN KEY
        public int AccountId { get; set; }

        public BankTransaction() { }

    }
}
