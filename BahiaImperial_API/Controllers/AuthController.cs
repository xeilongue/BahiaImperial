using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BahiaImperial_API.DTOs;
using BahiaImperial_API.Services.UserServ;

namespace BahiaImperial_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _service;

        public AuthController(IConfiguration configuration, IUserService service)
        {
            _configuration = configuration;
            _service = service;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDTO userlogin)
        {
            try
            {
                var user = await _service.GetById(userlogin.Cpf_Cnpj);

                if (user != null && user.Password == userlogin.Password)
                {
                    var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
                    var tokenDescription = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, userlogin.Cpf_Cnpj),
                            new Claim(ClaimTypes.Name, userlogin.Cpf_Cnpj),
                            new Claim(ClaimTypes.Role, "Administrador")
                        }),
                        Expires = DateTime.UtcNow.AddHours(2),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                        Issuer = _configuration["Jwt:Issuer"],
                        Audience = _configuration["Jwt:Audience"]

                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var token = tokenHandler.CreateToken(tokenDescription);

                    return Ok(new
                    {
                        token = tokenHandler.WriteToken(token),
                        mensagem = "Login feito com sucesso"
                    });
                }

                return Unauthorized(new
                {
                    erro = "Usuário ou senha inválidos"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    erro = ex.Message
                });
            }
        }

    }
}
