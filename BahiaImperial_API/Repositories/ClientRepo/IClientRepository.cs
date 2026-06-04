using BahiaImperial_API.Models;

namespace BahiaImperial_API.Repositories.ClientRepo
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> ListAll();
        Task Create(Client client);
        Task Update(Client client);
        Task Delete(Client client);
        Task<Client> GetById(String clientId);
    }
}
