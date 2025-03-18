using System;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace DataStore.Implementation
{
    public class DapperContext
    {
        private readonly  string _connectionString;
        public DapperContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public SqlConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
