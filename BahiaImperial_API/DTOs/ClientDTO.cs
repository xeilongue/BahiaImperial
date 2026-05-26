namespace BahiaImperial_API.DTOs
{
    public class ClientDTO
    {
        public string Cpf_Cnpj { get; set; }
        public string Name { get; set; }
        public decimal MonthlyIncome { get; set; }
        public DateOnly InceptionDate { get; set; }
    }
}
