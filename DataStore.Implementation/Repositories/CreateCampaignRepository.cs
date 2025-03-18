using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataStore.Abstraction.AbstractModels;
using DataStore.Abstraction.Models;
using DataStore.Abstraction.Repositories;

namespace DataStore.Implementation.Repositories
{
    public class CreateCampaignRepository : ICreateCampaignRepository
    {
        private readonly DapperContext _dapperContext;
        public CreateCampaignRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<bool> CreateCampaign(ICampaignModel campaign)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string sql = "INSERT INTO Campaigns ( FundraiserID,CompanyName,Image,Description,FundingGoal,EquityOffered,SharesTotal, SharesRemaining,StartDate,EndDate) VALUES (@FundraiserID,@CompanyName,@Image,@Description,@FundingGoal,@EquityOffered,@SharesTotal,@SharesRemaining,@StartDate,@EndDate)";
                int row = await connection.ExecuteAsync(sql, new { FundraiserID = campaign.FundraiserID, CompanyName = campaign.CompanyName, Image = campaign.Image, Description = campaign.Description, FundingGoal = campaign.FundingGoal, EquityOffered = campaign.EquityOffered, SharesTotal = campaign.SharesTotal, SharesRemaining = campaign.SharesTotal, StartDate = campaign.StartDate, EndDate = campaign.EndDate });
                return row > 0;
            }
        }
    }
}
