using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStore.Abstraction.DTO
{
    public class InvestmentListDTO
    {
        public int CampaignId { get; set; }
        public int InvestmentId { get; set; }
        public decimal AmountInvested { get; set; }
        public string CompanyName { get; set; }
        public string Image { get; set; }
        public int ShareBuyed { get; set; }
        public decimal EquityOwned { get; set; }
    }
}
