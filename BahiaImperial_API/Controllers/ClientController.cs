using BahiaImperial_API.Data;
using BahiaImperial_API.Models;
using BahiaImperial_API.Repositories.ClientRepo;
using Microsoft.AspNetCore.Mvc;

namespace BahiaImperial_API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepository _repository;

        public ClientController(IClientRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _repository.ListAll());

    }

}
