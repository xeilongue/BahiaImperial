using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;
using BahiaImperial_API.Repositories.TransactionRepo;
using System;
using System.Collections.Generic;
using System.Text;

namespace BahiaImperial_API.Services.TransactionServ
{
    public class TransactionService : ITransactionService
    {
        private readonly IBankTransactionRepository _repository;

        public TransactionService(IBankTransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<BankTransaction>> ListarTodos() =>
            await _repository.ListAll();

        public async Task Criar(TransactionDTO transactionDTO)
        {
            var transaction = new BankTransaction
            {
                Type = transactionDTO.Type,
                Amount = transactionDTO.Amount,
            };

            await _repository.Create(transaction);
        }
    }
}
