namespace BahiaImperial_API.DTOs
{
    public class AccountDTO
    {
        public enum AccountType
        {
            business = 0,
            checking = 1,
            saving = 2
        }

        public decimal Balance { get; set; } = 0;
        public decimal LoanLimit { get; set; }
        public AccountType Type { get; set; }

        public string Cpf_Cnpj { get; set; }
    }
}
