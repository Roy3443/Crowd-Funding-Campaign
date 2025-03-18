using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStore.Abstraction.DTO
{
    public class InvestmentDetailDTO
    {
        public decimal TotalAmountInvested { get; set; }
        public string CompanyName { get; set; }
        public string Image { get; set; }
        public decimal FundingGoal { get; set; }
        public decimal FundsRaised { get; set; }
        public decimal EquityOffered { get; set; }
        public int SharesTotal { get; set; }
        public int SharesRemaining { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public int TotalSharesBought { get; set; }
        public decimal TotalEquityOwned { get; set; }
        public List<MultipleInvestmentDTO> MultipleInvestment { get; set; }
    }
}
