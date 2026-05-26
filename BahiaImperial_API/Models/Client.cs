using System.ComponentModel.DataAnnotations;

namespace BahiaImperial_API.Models
{
    public class Client
    {

        // ATRIBUTOS
        public string Cpf_Cnpj { get; set; }
        public string Name { get; set; }
        public decimal MonthlyIncome { get; set; }
        public DateOnly InceptionDate { get; set; }

        public User User { get; set; }

        public Client () { }

    }
}