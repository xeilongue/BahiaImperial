using BahiaImperial_API.Data;
using BahiaImperial_API.Models.BankAccounts;
using Microsoft.EntityFrameworkCore;

namespace BahiaImperial_API.Repositories.AccountRepo
{
    public class AccountRepository : IAccountRepository
    {
        private readonly AppDbContext _context;

        public AccountRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Account>> ListAll()
        {
            return await _context.accounts.ToListAsync();
        }

        public async Task Create(Account account)
        {
            await _context.accounts.AddAsync(account);
            await _context.SaveChangesAsync();
        }
    }
}
