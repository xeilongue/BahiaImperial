// TransactionService.cs
using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;
using BahiaImperial_API.Repositories.AccountRepo;
using BahiaImperial_API.Repositories.TransactionRepo;

namespace BahiaImperial_API.Services.TransactionServ
{
    public class TransactionService : ITransactionService
    {
        private readonly IBankTransactionRepository _repository;
        private readonly IAccountRepository _accountRepository;

        public TransactionService(IBankTransactionRepository repository, IAccountRepository accountRepository)
        {
            _repository = repository;
            _accountRepository = accountRepository;
        }

        public async Task<IEnumerable<BankTransaction>> ListAll() =>
            await _repository.ListAll();

        public async Task<IEnumerable<BankTransaction>> GetByAccountId(int accountId) =>
            await _repository.GetByAccountId(accountId);

        public async Task Create(TransactionDTO transactionDTO)
        {
            var transaction = new BankTransaction
            {
                Type = transactionDTO.Type,
                Amount = transactionDTO.Amount,
            };
            await _repository.Create(transaction);
        }

        public async Task Deposit(int accountId, decimal amount)
        {
            if (amount <= 0)
                throw new ArgumentException("O valor do depósito deve ser maior que zero.");

            var account = await _accountRepository.GetAccountById(accountId)
                ?? throw new Exception("Conta não encontrada.");

            account.Balance += amount;
            await _accountRepository.Update(account);

            await _repository.Create(new BankTransaction
            {
                AccountId = accountId,
                Amount = amount,
                Type = TransactionType.Deposit,
                TrDate = DateTime.UtcNow
            });
        }

        public async Task Withdraw(int accountId, decimal amount)
        {
            if (amount <= 0)
                throw new ArgumentException("O valor do saque deve ser maior que zero.");

            var account = await _accountRepository.GetAccountById(accountId)
                ?? throw new Exception("Conta não encontrada.");

            if (account.Balance < amount)
                throw new InvalidOperationException("Saldo insuficiente.");

            account.Balance -= amount;
            await _accountRepository.Update(account);

            await _repository.Create(new BankTransaction
            {
                AccountId = accountId,
                Amount = amount,
                Type = TransactionType.Withdraw,
                TrDate = DateTime.UtcNow
            });
        }
    }
}