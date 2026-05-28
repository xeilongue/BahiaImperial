using BahiaImperial_API.Models;

namespace BahiaImperial_API.DTOs
{
    public class TransactionDTO
    {
        // ATRIBUTOS
        public int Id { get; set; }
        public TransactionType Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime TrDate { get; set; }

        public int AccountId { get; set; }
    }
}
