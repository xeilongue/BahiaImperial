using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models.BankAccounts;
using BahiaImperial_API.Repositories.AccountRepo;

namespace BahiaImperial_API.Services.AccountServ
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repository;

        public AccountService(IAccountRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Account>> ListAll() =>
            await _repository.ListAll();

        public async Task Create(AccountDTO accountDTO)
        {
            Account account;

            switch (accountDTO.Type)
            {
                case AccountDTO.AccountType.business:
                    account = new Business
                    {
                        Cpf_Cnpj = accountDTO.Cpf_Cnpj,
                        Balance = 0,
                        LoanLimit = 0,
                    };
                    break;

                case AccountDTO.AccountType.checking:
                    account = new Checking
                    {
                        Cpf_Cnpj = accountDTO.Cpf_Cnpj,
                        Balance = 0,
                        LoanLimit = 0,
                    };
                    break;

                case AccountDTO.AccountType.saving:
                    account = new Saving
                    {
                        Cpf_Cnpj = accountDTO.Cpf_Cnpj,
                        Balance = 0,
                        LoanLimit = 0,
                    };
                    break;

                default:
                    throw new Exception("Tipo de conta inválido.");
            }

            await _repository.Create(account);
        }
    }
}
