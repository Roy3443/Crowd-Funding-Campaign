using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.AbstractModels;

namespace DataStore.Abstraction.Models
{
    public class Campaign  : ICampaignModel
    {
        public int CampaignID { get; set; }
        public int FundraiserID { get; set; }
        public string Image { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public decimal FundingGoal { get; set; }
        public decimal FundsRaised { get; set; }
        public decimal EquityOffered { get; set; }  
        public int SharesTotal { get; set; }
        public int SharesRemaining { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }  
    }
}
