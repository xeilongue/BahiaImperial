using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;
using System.Collections.Generic;
using System.Text;

namespace BahiaImperial_API.Services.TransactionServ
{
    public interface ITransactionService
    {
        Task<IEnumerable<BankTransaction>> ListAll();
        Task Create(TransactionDTO transactionDTO);
    }
}
