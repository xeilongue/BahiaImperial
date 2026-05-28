using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;
using BahiaImperial_API.Repositories.ClientRepo;
using BahiaImperial_API.Services.ClientServ;

namespace BahiaImperial_API.Services.UserServ
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _repository;

        public ClientService(IClientRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Client>> ListAll() =>
            await _repository.ListAll();

        public async Task Create(ClientDTO clientDTO)
        {

            var client = new Client
            {
                Cpf_Cnpj = clientDTO.Cpf_Cnpj,
                Name = clientDTO.Name,
                MonthlyIncome = clientDTO.MonthlyIncome,
                InceptionDate = clientDTO.InceptionDate
            };

            await _repository.Create(client);
        }

        public async Task<Client> GetById(String clientId)
        {
            Client client = await _repository.GetById(clientId);

            if (client != null)
            {
                return client;
            }

            throw new Exception("Cadastro não encontrado.");
        }
    }
}
