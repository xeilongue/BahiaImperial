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

        public async Task<IEnumerable<Client>> ListarTodos() =>
            await _repository.ListAll();

        public async Task Criar(ClientDTO clientDTO)
        {
            //if (userDTO.AnoPublicado > DateTime.Now.Year)
            //    throw new Exception("Não é possivel publicar livros do futuro");

            var client = new Client
            {
                Cpf_Cnpj = clientDTO.Cpf_Cnpj,
                Name = clientDTO.Name,
                MonthlyIncome = clientDTO.MonthlyIncome,
            };

            await _repository.Create(client);
        }
    }
}
