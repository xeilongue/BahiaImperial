// ITransactionService.cs
using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;

namespace BahiaImperial_API.Services.TransactionServ
{
    public interface ITransactionService
    {
        Task<IEnumerable<BankTransaction>> ListAll();
        Task Create(TransactionDTO transactionDTO);
        Task Deposit(int accountId, decimal amount);
        Task Withdraw(int accountId, decimal amount);
        Task<IEnumerable<BankTransaction>> GetByAccountId(int accountId);
    }
}