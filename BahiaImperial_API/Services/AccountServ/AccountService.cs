using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;
using BahiaImperial_API.Models.BankAccounts;
using BahiaImperial_API.Repositories.AccountRepo;
using System;
using System.Collections.Generic;
using System.Text;

namespace BahiaImperial_API.Services.AccountServ
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repository;

        public AccountService(IAccountRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Account>> ListarTodos() =>
            await _repository.ListAll();

        public async Task Criar(AccountDTO accountDTO)
        {
            Account account;

            switch (accountDTO.Type)
            {
                case AccountDTO.AccountType.business:
                    account = new Business;
                    break;
                
            }

        }
    }
}
