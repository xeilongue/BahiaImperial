using BahiaImperial_API.Models;

namespace BahiaImperial_API.Repositories.TransactionRepo
{
    public interface IBankTransactionRepository
    {
        Task<IEnumerable<BankTransaction>> ListAll();
        Task Create(BankTransaction bankTransaction);
        Task Update(BankTransaction bankTransaction);
        Task Delete(BankTransaction bankTransaction);
        //Task<BankTransaction> GetByBank(String TransactionByBank);
    }
}
