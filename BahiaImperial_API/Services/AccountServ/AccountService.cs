using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models.BankAccounts;
using BahiaImperial_API.Repositories.AccountRepo;
using BahiaImperial_API.Repositories.ClientRepo;

namespace BahiaImperial_API.Services.AccountServ
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repository;
        private readonly IClientRepository _clientRepository;

        public AccountService(IAccountRepository repository, IClientRepository clientRepository)
        {
            _repository = repository;
            _clientRepository = clientRepository;
        }

        public async Task<IEnumerable<Account>> ListAll() => await _repository.ListAll();

        public async Task Create(AccountDTO accountDTO)
        {
            Account account;

            switch (accountDTO.Type)
            {
                case AccountType.business:
                    account = new Business
                    {
                        Cpf_Cnpj = accountDTO.Cpf_Cnpj, // Vínculo necessário
                        Balance = 0,
                        LoanLimit = accountDTO.LoanLimit,
                        Type = AccountType.business
                    };
                    break;

                case AccountType.checking:
                    account = new Checking
                    {
                        Cpf_Cnpj = accountDTO.Cpf_Cnpj, // Vínculo necessário
                        Balance = 0,
                        LoanLimit = accountDTO.LoanLimit,
                        Type = AccountType.checking
                    };
                    break;

                case AccountType.saving:
                    account = new Saving
                    {
                        Cpf_Cnpj = accountDTO.Cpf_Cnpj, // Vínculo necessário
                        Balance = 0,
                        LoanLimit = 0,
                        Type = AccountType.saving
                    };
                    break;

                default:
                    throw new Exception("Tipo de conta inválido.");
            }

            await _repository.Create(account);
        }

        public async Task<List<AccountDTO>> GetAccountByUserId(string userId)
        {
            if (userId == null) throw new ArgumentException("ID de usuário inválido.");
            var accounts = await _repository.GetAccountByUserId(userId);
            return accounts ?? new List<AccountDTO>();
        }
    }
}