using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;

namespace BahiaImperial_API.Services.UserServ
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListarTodos();
        Task Criar(UserDTO userDTO);
        Task Delete(String userID);
        Task Update(UserDTO userDTO);
        Task<UserDTO> GetById(String userId);
    }
}
