using System.Security.Claims;
using DataStore.Abstraction.Models;
using FeatureObjects.Abstraction.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrowdFunding.Controllers
{
    [Authorize(Roles = "Fundraiser")]
    [ApiController]
    [Route("/create")]
    public class CreateCampaignController : ControllerBase
    {
        private readonly ICreateCampaignManager _manager;
        public CreateCampaignController(ICreateCampaignManager manager)
        {
            _manager = manager;
        }
        [HttpPost]
        public async Task<ActionResult> CreateCampaign([FromBody] Campaign campaign)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token");
            }
            int parsedUserId = int.Parse(userIdClaim);
            campaign.FundraiserID = parsedUserId;

            var new_campaign = await _manager.CreateCampaign(campaign);
            if (!new_campaign)
            {
                return BadRequest("Failed to create campaign.");
            }

            return Ok(new { Message = "Campaign created successfully" });
        }

    }
}
