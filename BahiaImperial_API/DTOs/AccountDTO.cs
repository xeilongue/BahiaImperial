using BahiaImperial_API.Models.BankAccounts;

namespace BahiaImperial_API.DTOs
{
    public class AccountDTO
    {
        public int Id { get; set; }
        public decimal Balance { get; set; } = 0;
        public decimal LoanLimit { get; set; } = 400;
        public decimal LoanDebt { get; set; }
        public AccountType Type { get; set; }

        public string Cpf_Cnpj { get; set; }
    }
}
