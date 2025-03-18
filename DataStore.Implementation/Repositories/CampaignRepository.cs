using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataStore.Abstraction.DTO;
using DataStore.Abstraction.Exceptions;
using DataStore.Abstraction.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;

namespace DataStore.Implementation.Repositories
{
    public class CampaignRepository : ICampaignRepository
    {
        private readonly DapperContext _dapperContext;
        private readonly ILogger<ICampaignRepository> _logger;
        public CampaignRepository(DapperContext dapperContext, ILogger<ICampaignRepository> logger)
        {
            _dapperContext = dapperContext;
            _logger = logger;
        }
        public async Task<IEnumerable<CampaignDTO>> GetCampaigns()
        {
            try
            {
                using (var connection = _dapperContext.CreateConnection())
                {
                    string query = "SELECT CampaignID,CompanyName,Image,FundingGoal,FundsRaised,EndDate FROM  Campaigns";
                    return await connection.QueryAsync<CampaignDTO>(query);
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError($"Database error occurred: {ex.Message}");


                throw new DatabaseException("An error occurred while fetching campaigns. Please try again later.", ex);
            }
        }

    }
}
