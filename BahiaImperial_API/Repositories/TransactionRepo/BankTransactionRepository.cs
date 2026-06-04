// BankTransactionRepository.cs
using BahiaImperial_API.Data;
using BahiaImperial_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BahiaImperial_API.Repositories.TransactionRepo
{
    public class BankTransactionRepository : IBankTransactionRepository
    {
        private readonly AppDbContext _context;

        public BankTransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BankTransaction>> ListAll()
        {
            return await _context.transactions.ToListAsync();
        }

        public async Task Create(BankTransaction bankTransaction)
        {
            await _context.transactions.AddAsync(bankTransaction);
            await _context.SaveChangesAsync();
        }

        public async Task Update(BankTransaction bankTransaction)
        {
            _context.transactions.Update(bankTransaction);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(BankTransaction bankTransaction)
        {
            _context.transactions.Remove(bankTransaction);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BankTransaction>> GetByAccountId(int accountId) // NOVO
        {
            return await _context.transactions
                .Where(t => t.AccountId == accountId)
                .OrderByDescending(t => t.TrDate)
                .ToListAsync();
        }
    }
}