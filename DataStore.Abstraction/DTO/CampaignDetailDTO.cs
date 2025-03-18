using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeatureObjects.Abstraction.DTO
{
    public class CampaignDetailDTO
    {
        public int CampaignId { get; set; }
        public string Image { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public decimal FundingGoal { get; set; }
        public decimal FundsRaised { get; set; }
        public decimal EquityOffered { get; set; }
        public int SharesTotal { get; set; }
        public int SharesRemaining { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
    }
}
