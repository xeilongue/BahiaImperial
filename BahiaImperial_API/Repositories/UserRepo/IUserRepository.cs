using BahiaImperial_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BahiaImperial_API.Repositories.UserRepo
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> ListAll();
        Task Create(User user);
        Task Update(User user);
        Task Delete(User user);
        Task<User> GetById(String userId);

    }
}
