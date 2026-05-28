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
            if (clientDTO.InceptionDate > DateOnly.FromDateTime(DateTime.Now) ||
                clientDTO.InceptionDate < new DateOnly(1906, 01, 01)
            )
                throw new Exception("Data de nascimento inválida.");

            if (clientDTO.InceptionDate > DateOnly.FromDateTime((DateTime.Now).AddYears(-18)))
                throw new Exception("Você deve ser maior de idade para abrir uma conta.");

            if (clientDTO.MonthlyIncome <= 0)
                throw new Exception("Salário inválido.");

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
