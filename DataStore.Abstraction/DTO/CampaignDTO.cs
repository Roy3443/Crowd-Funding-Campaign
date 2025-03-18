using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStore.Abstraction.DTO
{
    public class CampaignDTO
    {
        public int CampaignId { get; set; }
        public string Image { get; set; }
        public string CompanyName { get; set; }
        public decimal FundingGoal { get; set; }
        public decimal FundsRaised { get; set; }
        public DateTime EndDate { get; set; }
    }
}
