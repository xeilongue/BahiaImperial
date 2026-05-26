using BahiaImperial_API.DTOs;
using BahiaImperial_API.Services.AccountServ;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace BahiaImperial_API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly IAccountService _service;

        public AccountController(IAccountService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [Authorize]
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
