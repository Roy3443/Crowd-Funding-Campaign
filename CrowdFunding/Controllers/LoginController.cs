using System.Reflection;
using CrowdFunding.DTO;
using DataStore.Abstraction.Models;
using FeatureObjects.Abstraction.Managers;
using Microsoft.AspNetCore.Mvc;

namespace CrowdFunding.Controllers
{
    [ApiController]
    [Route("/login")]
    public class LoginController : ControllerBase
    {
        private ILoginManager _loginManager;
        public LoginController (ILoginManager loginManager)
        {
            _loginManager = loginManager;
        }
        [HttpPost]
        public async Task<ActionResult<string>> Login([FromBody] LoginDTO loginDTO)
        {
            var token = await _loginManager.ValidateUser(loginDTO.Password, loginDTO.Email);
            if (token == null)
            {
                return Unauthorized("Invalid username or password");
            }
            return Ok(token);

        }
    }
}
