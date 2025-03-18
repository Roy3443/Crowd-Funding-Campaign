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
    public class InvestmnetDetailRepository : IInvestmentDetailRepository
    {
        private readonly DapperContext _dapperContext;
        public InvestmnetDetailRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<InvestmentDetailDTO> GetUniqueInvestmentDetails(int campaignId, int userId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                await connection.OpenAsync();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {

                        var query = @"
                            SELECT
                            i.CampaignId,
                            c.CompanyName,
                            c.Image,
                            c.FundingGoal,
                            c.FundsRaised,
                            c.EquityOffered,
                            c.SharesTotal,
                            c.SharesRemaining,
                            c.StartDate,
                            c.EndDate,
                            c.Status,
                            SUM(i.AmountInvested) AS TotalAmountInvested, --Sum of all investments in this campaign
                            SUM(i.ShareBuyed) AS TotalSharesBought, --Sum of all shares bought
                            SUM(i.EquityOwned) AS TotalEquityOwned, --Total equity owned
                            MAX(i.InvestmentDate) AS LastInvestmentDate --Last investment date
                            FROM Investments i
                            JOIN Campaigns c ON i.CampaignId = c.CampaignId
                            WHERE i.UserId = @UserId AND c.CampaignID = @CampaignId
                            GROUP BY i.CampaignId, c.CompanyName, c.Image, c.FundingGoal, c.FundsRaised, c.EquityOffered, 
                            c.SharesTotal, c.SharesRemaining, c.StartDate, c.EndDate, c.Status;";

                        var campaign = await connection.QuerySingleOrDefaultAsync<InvestmentDetailDTO>(
                        query, new { CampaignId = campaignId, UserId = userId }, transaction);

                        if (campaign == null)
                        {
                            return null;
                        }

                        string investorQuery = @"
                                                SELECT 
                                                i.InvestmentDate,
                                                p.TransactionId,
                                                p.PaymentMethod,
                                                i.AmountInvested,
                                                i.ShareBuyed,
                                                i.EquityOwned
                                                FROM Investments i
                                                LEFT JOIN Payment p ON i.InvestmentId = p.InvestmentId
                                                WHERE i.UserId = @UserId AND i.CampaignId = @CampaignId
                                                ORDER BY i.InvestmentDate DESC;";

                        var seperateinvestment = (await connection.QueryAsync<MultipleInvestmentDTO>(investorQuery, new { UserId = userId, CampaignId = campaignId }, transaction)).ToList();

                        campaign.MultipleInvestment = seperateinvestment;

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
    }
}
