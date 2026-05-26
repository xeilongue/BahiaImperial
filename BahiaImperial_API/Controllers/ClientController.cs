using BahiaImperial_API.Data;
using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;
using BahiaImperial_API.Repositories.ClientRepo;
using BahiaImperial_API.Services.ClientServ;
using Microsoft.AspNetCore.Mvc;

namespace BahiaImperial_API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _service;

        public ClientController(IClientService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpPost]
        public async Task<IActionResult> Post(ClientDTO clientDTO)
        {
            try
            {
                await _service.Create(clientDTO);
                return Ok("Cliente cadastrado");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
