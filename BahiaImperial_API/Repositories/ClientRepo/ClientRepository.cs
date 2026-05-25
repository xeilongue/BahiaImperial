using BahiaImperial_API.Data;
using BahiaImperial_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BahiaImperial_API.Repositories.ClientRepo
{
    public class ClientRepository : IClientRepository
    {
        private readonly AppDbContext _context;

        public ClientRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Client>> ListAll()
        {
            return await _context.clients.ToListAsync();
        }

        public async Task Create(Client client)
        {
            await _context.clients.AddAsync(client);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Client client)
        {
            _context.clients.Update(client);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Client client)
        {
            _context.clients.Remove(client);
            await _context.SaveChangesAsync();
        }
    }
}
