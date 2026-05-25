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
            //if (userDTO.AnoPublicado > DateTime.Now.Year)
            //    throw new Exception("Não é possivel publicar livros do futuro");

            //if ()
            //var account = new Account
            //{
            //    LoanLimit = accountDTO.LoanLimit

            //};

            //await _repository.Adicionar(account);

            // NÃO DÁ PARA CRIAR UMA CLASSE ABSTRATA
        }
    }
}
