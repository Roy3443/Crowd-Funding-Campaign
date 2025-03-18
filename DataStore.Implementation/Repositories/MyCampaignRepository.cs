using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataStore.Abstraction.DTO;
using DataStore.Abstraction.Repositories;

namespace DataStore.Implementation.Repositories
{
    public class MyCampaignRepository : IMyCampaignRepository
    {
        private readonly DapperContext _dapperContext;
        public MyCampaignRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<IEnumerable<CampaignDTO>> GetFundraiserCampaigns(int fundraiserID)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string query = @"SELECT CampaignID,CompanyName,Image,FundingGoal,FundsRaised,EndDate FROM  Campaigns WHERE FundraiserID=@FundraiserID";
                return await connection.QueryAsync<CampaignDTO>(query, new { FundraiserID = fundraiserID });
            }
        }

        public async Task<MyCampaignDTO> GetFundraiserCampaignDetails(int campaignId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                await connection.OpenAsync();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        string campaignQuery = @"
                        SELECT 
                            c.CampaignId,
                            c.CompanyName,
                            c.Image,
                            c.Description,
                            c.FundingGoal,
                            c.FundsRaised,
                            c.EquityOffered,
                            c.SharesTotal,
                            c.SharesRemaining,
                            c.StartDate,
                            c.EndDate,
                            c.Status
                        FROM Campaigns c
                        WHERE c.CampaignID = @CampaignId;";

                        var campaign = await connection.QuerySingleOrDefaultAsync<MyCampaignDTO>(
                            campaignQuery, new { CampaignId = campaignId }, transaction);

                        if (campaign == null)
                        {
                            return null;
                        }

                        string investorQuery = @"
                        SELECT 
                            i.CampaignId,
                            u.Name AS InvestorName,
                            i.AmountInvested,
                            i.InvestmentDate,
                            i.ShareBuyed,
                            i.EquityOwned
                        FROM Investments i
                        JOIN Users u ON i.UserId = u.UserID
                        WHERE i.CampaignId = @CampaignId;";

                        var investors = (await connection.QueryAsync<CampaignInvestorDTO>(
                            investorQuery, new { CampaignId = campaignId }, transaction)).ToList();

                        campaign.CampaignInvesters = investors;

                        transaction.Commit();
                        return campaign;
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        Console.WriteLine($"Error in CampaigDashboardAsync: {ex.Message}");
                        throw;
                    }
                }
            }
        }
        public async Task<bool> DeleteCampaign(int campaignId, int fundraiserId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string sql = @"DELETE FROM Campaigns 
                       WHERE CampaignID = @CampaignId 
                       AND FundraiserID = @FundraiserID";

                int rowsAffected = await connection.ExecuteAsync(sql, new
                {
                    CampaignId = campaignId,
                    FundraiserID = fundraiserId
                });

                return rowsAffected > 0;
            }
        }
    }
}
