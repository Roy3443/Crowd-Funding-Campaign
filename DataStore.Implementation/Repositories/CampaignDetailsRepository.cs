using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataStore.Abstraction.Repositories;
using FeatureObjects.Abstraction.DTO;

namespace DataStore.Implementation.Repositories
{

    public class CampaignDetailsRepository : ICampaignDetailsRepository
    {
        private readonly DapperContext _dapperContext;
        public CampaignDetailsRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<CampaignDetailDTO> GetCampaignDetails(int campaignID)
        {
            using(var connection = _dapperContext.CreateConnection())
            {
                var sql = "SELECT c.CampaignID, c.Image, c.CompanyName,  c.Description,  c.FundingGoal, c.FundsRaised, c.EquityOffered,c.SharesTotal, c.SharesRemaining,c.EndDate, c.Status FROM Campaigns c WHERE c.CampaignID = @CampaignID;";
                return await connection.QueryFirstOrDefaultAsync<CampaignDetailDTO>(sql, new { CampaignID = campaignID });
            }
        }
    }
}
