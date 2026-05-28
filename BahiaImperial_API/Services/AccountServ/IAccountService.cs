using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models.BankAccounts;
using System;
using System.Collections.Generic;
using System.Text;

namespace BahiaImperial_API.Services.AccountServ
{
    public interface IAccountService
    {
        Task<IEnumerable<Account>> ListAll();
        Task Create(AccountDTO accountDTO);
        Task<List<AccountDTO>> GetAccountByUserId(string userId);
    }
}
