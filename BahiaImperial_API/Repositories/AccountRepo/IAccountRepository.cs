// IAccountRepository.cs
using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models.BankAccounts;

namespace BahiaImperial_API.Repositories.AccountRepo
{
    public interface IAccountRepository
    {
        Task<IEnumerable<Account>> ListAll();
        Task Create(Account account);
        Task Update(Account account);
        Task Delete(Account account);
        Task<List<AccountDTO>> GetAccountByUserId(string userId);
        Task<Account?> GetAccountById(int accountId); // NOVO
    }
}