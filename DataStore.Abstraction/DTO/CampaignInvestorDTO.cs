using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStore.Abstraction.DTO
{
    public class CampaignInvestorDTO
    {
        public int CampaignId { get; set; }
        public string InvestorName { get; set; }
        public decimal AmountInvested { get; set; }
        public DateTime InvestmentDate { get; set; }
        public int ShareBuyed { get; set; }
        public decimal EquityOwned { get; set; }
    }
}
