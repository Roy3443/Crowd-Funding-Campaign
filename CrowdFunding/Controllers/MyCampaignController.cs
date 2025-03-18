using System.Security.Claims;
using DataStore.Abstraction.DTO;
using FeatureObjects.Abstraction.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrowdFunding.Controllers
{
    [Authorize(Roles = "Fundraiser")]
    [ApiController]
    [Route("fundraiser")]
    public class MyCampaignController : ControllerBase
    {
        private readonly IMyCampaignManager _manager;
        public MyCampaignController(IMyCampaignManager manager)
        {
            _manager = manager;
        }
        [HttpGet("campaigns")]
        public async Task<ActionResult<IEnumerable<CampaignDTO>>> GetAllCampaigns()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            int parsedUserId = int.Parse(userId);
            var campaigns = await _manager.GetAllFundraiserCampaigns(parsedUserId);
            return Ok(campaigns);
        }
        [HttpGet("campaigns/campaigndetails")]
        public async Task<ActionResult<MyCampaignDTO>> GetFundraiserCampaignDetails(int CampaignId)
        {
            var investmentdetails = await _manager.GetFundraiserCampaignDetails(CampaignId);
            return Ok(investmentdetails);
        }
        [HttpDelete("campaigns/{campaignId}")]
        public async Task<IActionResult> DeleteCampaign(int campaignId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            int fundraiserId = int.Parse(userId);
            bool isDeleted = await _manager.DeleteCampaign(campaignId, fundraiserId);

            if (isDeleted)
            {
                return Ok("Campaign deleted successfully.");
            }
            else
            {
                return NotFound("Campaign not found or you are not authorized to delete it.");
            }
        }

    }
}
