namespace BahiaImperial_API.Models
{
    public enum TransactionType
    {
        Deposit = 0,
        LoanRequest = 1,
        LoanRepayment = 2,
        Transfer = 3,
        Withdraw = 4
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

        //public Transaction (TransactionType Type, decimal Amount, int AccountId)
        //{
        //    this.Type = Type;
        //    this.Amount = Amount;

        //    this.AccountId = AccountId; .
        //}
    }
}
