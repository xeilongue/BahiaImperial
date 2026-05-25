using BahiaImperial_API.Models;
using BahiaImperial_API.Models.BankAccounts;

namespace BahiaImperial_API.Repositories.AccountRepo
{
    public interface IAccountRepository
    {
        Task<IEnumerable<Account>> ListAll();
        Task Create(Account accounts);
        Task Update(Account account);
        Task Delete(Account account);
    }
}