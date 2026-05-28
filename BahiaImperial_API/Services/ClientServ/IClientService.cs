using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;

namespace BahiaImperial_API.Services.ClientServ
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> ListAll();
        Task Create(ClientDTO clientDTO);
        Task<Client> GetById(String clientId);
    }
}
