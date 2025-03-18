using System.Security.Claims;
using DataStore.Abstraction.DTO;
using FeatureObjects.Abstraction.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrowdFunding.Controllers
{
    [Authorize(Roles = "Investor")]
    [ApiController]
    [Route("investor")]
    public class InvestmentListController : ControllerBase
    {
        private readonly IInvestmentListManager _investmentListManager;
        public InvestmentListController(IInvestmentListManager investmentListManager)
        {
            _investmentListManager = investmentListManager;
        }
        [HttpGet("investments")]
        public async Task<ActionResult<IEnumerable<InvestmentListDTO>>> GetInvestmentLists()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token.");
                }

                int parsedUserId = int.Parse(userId);

                var investmentlist = await _investmentListManager.InvestmentList(parsedUserId);
                return Ok(investmentlist);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
         
        }
    }
}
    

