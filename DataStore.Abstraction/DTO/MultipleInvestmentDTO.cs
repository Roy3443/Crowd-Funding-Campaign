using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStore.Abstraction.DTO
{
    public class MultipleInvestmentDTO
    {
        public DateTime InvestmentDate { get; set; }
        public string TransactionId { get; set; }
        public string PaymentMethod { get; set; }
        public int AmountInvested { get; set; }
        public int ShareBuyed { get; set; }
        public decimal EquityOwned { get; set; }
    }
}
