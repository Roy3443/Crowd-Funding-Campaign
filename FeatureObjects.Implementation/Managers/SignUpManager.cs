using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.AbstractModels;
using DataStore.Abstraction.Models;
using DataStore.Abstraction.Repositories;
using FeatureObjects.Abstraction.Managers;
using FeatureObjects.Abstraction.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace FeatureObjects.Implementation.Managers
{
    public class SignUpManager : ISignUpManager
    {
        private readonly ISignUpRepository _signUpRepository;
        private readonly IPasswordHashingService _passwordHashingService;
        private readonly IJwtToken _jwtToken;
        public  SignUpManager(ISignUpRepository signUpRepository, IPasswordHashingService passwordHashingService, IJwtToken jwtToken)
        {
            _signUpRepository = signUpRepository;
            _passwordHashingService = passwordHashingService;
            _jwtToken = jwtToken;
        }

        public async Task<string> SignUpUser(IUserModel userModel)
        {
            userModel.PasswordHash = _passwordHashingService.HashPassword(userModel.PasswordHash);
            var userid =  await _signUpRepository.SignUp(userModel);
            userModel.UserID = userid;
            var token = _jwtToken.GenerateJwtToken(userModel);
            return token;
            
        }

    }
}
