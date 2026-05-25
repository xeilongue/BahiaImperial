using BahiaImperial_API.Data;
using BahiaImperial_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BahiaImperial_API.Repositories.UserRepo
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> ListAll()
        {
            return await _context.users.ToListAsync();
        }

        public async Task Create(User user)
        {
            await _context.users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task Update(User user)
        {
            _context.users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(User user)
        {
            _context.users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetById(String userId)
        {
            return await _context.users.FirstOrDefaultAsync(u => u.Cpf_Cnpj == userId);
        }

    }
}
