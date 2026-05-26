using BahiaImperial_API.DTOs;
using BahiaImperial_API.Services.TransactionServ;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(TransactionDTO transactionDTO)
        {
            try
            {
                await _service.Create(transactionDTO);
                return Ok("Transação cadastrado");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
