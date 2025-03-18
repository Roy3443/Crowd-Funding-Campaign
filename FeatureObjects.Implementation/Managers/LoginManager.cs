using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.Models;
using DataStore.Abstraction.Repositories;
using FeatureObjects.Abstraction.Managers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using FeatureObjects.Abstraction.Services;


namespace FeatureObjects.Implementation.Managers
{
    public class LoginManager : ILoginManager
    {
        private readonly ILoginRepository _loginRepository;
        private readonly IConfiguration _configuration;
        private readonly IJwtToken _jwtToken;
        public LoginManager(ILoginRepository loginRepository, IConfiguration configuration, IJwtToken jwtToken)
        {
            _loginRepository = loginRepository;
            _configuration = configuration;
            _jwtToken = jwtToken;

        }
        public async Task<string> ValidateUser(string password, string email)
        {

            var user_details = await _loginRepository.GetLoginDetails(email);
            if (user_details == null)
            {
                return null;
            }
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user_details.PasswordHash);

            if (!isPasswordValid)
            {
                return null;
            }
            
            
            var token = _jwtToken.GenerateJwtToken(user_details);
            return token;
            
        }
    }
}
