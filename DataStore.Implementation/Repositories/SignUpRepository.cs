
using Dapper;
using DataStore.Abstraction.AbstractModels;
using DataStore.Abstraction.Models;
using DataStore.Abstraction.Repositories;

namespace DataStore.Implementation.Repositories
{
    public class SignUpRepository: ISignUpRepository
    {
        private readonly DapperContext _dapperContext;
        public SignUpRepository(DapperContext dapperContext) {
            _dapperContext = dapperContext;
        }
        public async Task<int> SignUp(IUserModel user)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string sql = "INSERT INTO Users(Name, Email, PasswordHash, Role) VALUES(@UserName, @Email, @Password, @Role); SELECT CAST(SCOPE_IDENTITY() AS INT)";
                int user_id = await connection.ExecuteScalarAsync<int>(sql, new { UserName = user.Name, Email = user.Email, Password = user.PasswordHash, Role = user.Role });
                return user_id;

            }


        }
    }
}
