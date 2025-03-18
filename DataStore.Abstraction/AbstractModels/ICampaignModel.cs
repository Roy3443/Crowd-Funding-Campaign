using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStore.Abstraction.AbstractModels
{
    public interface ICampaignModel
    {
         int CampaignID { get; set; }
         int FundraiserID { get; set; }
         string Image { get; set; }
         string CompanyName { get; set; }
         string Description { get; set; }
         decimal FundingGoal { get; set; }
         decimal FundsRaised { get; set; }
         decimal EquityOffered { get; set; }
         int SharesTotal { get; set; }
         int SharesRemaining { get; set; }
         DateTime StartDate { get; set; }
         DateTime EndDate { get; set; }
         string Status { get; set; }
    }
}
