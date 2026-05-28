// TransactionController.cs
using BahiaImperial_API.DTOs;
using BahiaImperial_API.Services.TransactionServ;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BahiaImperial_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _service;

        public TransactionController(ITransactionService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        // GET api/Transaction/history/{accountId}
        [Authorize]
        [HttpGet("history/{accountId}")]
        public async Task<IActionResult> GetHistory(int accountId)
        {
            try
            {
                var transactions = await _service.GetByAccountId(accountId);
                return Ok(new { data = transactions });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST api/Transaction/deposit
        [Authorize]
        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit([FromBody] TransactionDTO dto)
        {
            try
            {
                await _service.Deposit(dto.AccountId, dto.Amount);
                return Ok(new { message = "Depósito realizado com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST api/Transaction/withdraw
        [Authorize]
        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw([FromBody] TransactionDTO dto)
        {
            try
            {
                await _service.Withdraw(dto.AccountId, dto.Amount);
                return Ok(new { message = "Saque realizado com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(TransactionDTO transactionDTO)
        {
            try
            {
                await _service.Create(transactionDTO);
                return Ok("Transação cadastrada");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}