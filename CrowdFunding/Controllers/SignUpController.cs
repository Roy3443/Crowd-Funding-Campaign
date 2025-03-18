using DataStore.Abstraction.AbstractModels;
using DataStore.Abstraction.Models;
using FeatureObjects.Abstraction.Managers;

using Microsoft.AspNetCore.Mvc;

namespace CrowdFunding.Controllers
{
    [ApiController]
    [Route("/signup")]
    public class SignUpController: ControllerBase
    {
        private readonly ISignUpManager _signUpManager;
        public SignUpController(ISignUpManager signUpManager)
        {
            _signUpManager = signUpManager;
        }
        [HttpPost]   
        public async Task<string> SignUp([FromBody] UserModel model)
        {
            return await _signUpManager.SignUpUser(model);
        }
        
    }
}
