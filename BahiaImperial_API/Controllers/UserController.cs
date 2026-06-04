using Microsoft.AspNetCore.Mvc;
using BahiaImperial_API.DTOs;
using BahiaImperial_API.Services.UserServ;
using Microsoft.AspNetCore.Authorization;

namespace BahiaImperial_API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet("All")]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(String userId)
        {
            return Ok(await _service.GetById(userId));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserDTO userDTO)
        {
            try
            {
                await _service.Create(userDTO);
                return Ok(new { message = "Usuario cadastrado" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] String userId)
        {
            try
            {
                await _service.Delete(userId);
                return Ok(new { message = "Usuário deletado com sucesso!" });
            }
            catch (Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UserDTO userDTO)
        {
            try
            {
                await _service.Update(userDTO);
                return Ok(new { message = "Usuário atualizado com sucesso!" });
            }
            catch (Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }

    }
}

