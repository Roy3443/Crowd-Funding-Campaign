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
    public class InvestmentDetailsController : ControllerBase
    {
        private readonly IInvestmentDetailManager _manager;
        public InvestmentDetailsController(IInvestmentDetailManager manager)
        {
            _manager = manager;
        }
        [HttpGet("{campaignId}/investmentdetails")]
        public async Task<ActionResult<InvestmentDetailDTO>> GetUniqueInvestmentDetails(int campaignId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = int.Parse(userIdClaim);
            var investmentdetails = await _manager.GetUniqueInvestmentDetailsAsync(campaignId, userId);
            return Ok(investmentdetails);
        }
    }
}
