using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataStore.Abstraction.Repositories;
using DataStore.Abstraction.Models;
using DataStore.Abstraction.AbstractModels;

namespace DataStore.Implementation.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly DapperContext _dapper;
        public  LoginRepository(DapperContext dapper)
        {
            _dapper = dapper;
        }

 

        public async Task<IUserModel> GetLoginDetails(string email)
        {
            using (var connection = _dapper.CreateConnection())
            {
                string sql = "SELECT * FROM Users WHERE Email = @UserEmail";
                return await connection.QueryFirstOrDefaultAsync<UserModel>(sql, new {UserEmail = email });
            }

        }
    }
}
