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
    public class InvestmentListRepository : IInvestmentListRepository
    {
        private readonly DapperContext _dapperContext;
        public InvestmentListRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<IEnumerable<InvestmentListDTO>> GetInvestmentsAsync(int UserId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                var query = @"
                SELECT 
                i.CampaignId,
                MAX(i.InvestmentId) AS InvestmentId, 
                SUM(i.AmountInvested) AS AmountInvested, -- Total Invested Amount
                c.CompanyName,
                c.Image,
                SUM(i.ShareBuyed) AS ShareBuyed, -- Total Shares Bought
                SUM(i.EquityOwned) AS EquityOwned -- Total Equity Owned
                FROM Investments i
                INNER JOIN Campaigns c ON i.CampaignId = c.CampaignID
                WHERE i.UserId = @UserId
                GROUP BY i.CampaignId, c.CompanyName, c.Image;";

                return await connection.QueryAsync<InvestmentListDTO>(query, new { UserId = UserId });
            }
        }
    }
}
