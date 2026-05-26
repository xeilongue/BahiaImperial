using BahiaImperial_API.DTOs;
using BahiaImperial_API.Services.AccountServ;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace BahiaImperial_API.Controllers
{
    public class AccountController : ControllerBase
    {

        private readonly IAccountService _service;

        public AccountController(IAccountService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpPost]
        public async Task<IActionResult> Post(AccountDTO accountDTO)
        {
            try
            {
                await _service.Create(accountDTO);
                return Ok("Usuario cadastrado");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
