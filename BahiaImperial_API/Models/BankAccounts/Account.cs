namespace BahiaImperial_API.Models.BankAccounts
{
    public abstract class Account
    {
        public enum AccountType
        {
            business = 0,
            checking = 1,
            saving = 2
        }

        // ATRIBUTOS
        public int Id { get; set; }
        public decimal Balance { get; set; } = 0;
        public decimal LoanLimit { get; set; }
        public decimal LoanDebt { get; set; }
        public AccountType Type { get; set; }

        // FOREIGN KEY
        public string Cpf_Cnpj { get; set; }

        // NAVIGATION
        public ICollection<BankTransaction> Transactions { get; set; } = new List<BankTransaction>();

        public Account () { }

    }
}
