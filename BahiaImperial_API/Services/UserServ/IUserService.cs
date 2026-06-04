using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;

namespace BahiaImperial_API.Services.UserServ
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAll();
        Task Create(UserDTO userDTO);
        Task Delete(String userID);
        Task Update(UserDTO userDTO);
        Task<UserDTO> GetById(String userId);
    }
}
