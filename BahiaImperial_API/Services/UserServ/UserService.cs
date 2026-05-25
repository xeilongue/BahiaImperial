using BahiaImperial_API.DTOs;
using BahiaImperial_API.Models;
using BahiaImperial_API.Repositories.UserRepo;

namespace BahiaImperial_API.Services.UserServ
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<User>> ListarTodos() =>
            await _repository.ListAll();

        public async Task Criar(UserDTO userDTO)
        {
            if (userDTO.Cpf_Cnpj == null || userDTO.Cpf_Cnpj.Trim() == "")
            {
                throw new Exception("CPF ou CNPJ é obrigatório!");
            }

            if (userDTO.Password == null || userDTO.Password.Trim() == "")
            {
                throw new Exception("Senha é obrigatória!");
            }

            userDTO.Cpf_Cnpj = userDTO.Cpf_Cnpj.Trim();

            userDTO.Cpf_Cnpj = userDTO.Cpf_Cnpj
            .Replace(".", "")
            .Replace("-", "")
            .Replace("/", "");

            userDTO.Password = userDTO.Password.Trim();

            if (userDTO.Cpf_Cnpj.Length != 11 && userDTO.Cpf_Cnpj.Length != 14)
            {
                throw new Exception("CPF ou CNPJ inválido!");
            }

            User validateUser = await _repository.GetById(userDTO.Cpf_Cnpj);
            if (validateUser != null)
            {
                throw new Exception("Esse usuário já está cadastrado.");
            }

            var user = new User
            {
                Cpf_Cnpj = userDTO.Cpf_Cnpj,
                Password = userDTO.Password,
            };

            await _repository.Create(user);
        }

        public async Task Delete(String userId)
        {
            User user = await _repository.GetById(userId);

            if (user != null) await _repository.Delete(user);
            else throw new Exception("Usuário não encontrado");
        }

        public async Task Update(UserDTO userDTO)
        {
            User user = await _repository.GetById(userDTO.Cpf_Cnpj);

            if (user != null)
            {
                user.Password = userDTO.Password;
                await _repository.Delete(user);
            }
            else throw new Exception("Usuário não encontrado");
        }

        public async Task<UserDTO> GetById(String userId)
        {
            User user = await _repository.GetById(userId);

            if (user != null)
            {
                UserDTO userDTO = new UserDTO
                {
                    Cpf_Cnpj = user.Cpf_Cnpj,
                    Password = user.Password
                };
                return userDTO;
            }

            else throw new Exception("Usuário não encontrado");
        }
    }
}
