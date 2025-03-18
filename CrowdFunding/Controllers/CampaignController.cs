using DataStore.Abstraction.DTO;
using FeatureObjects.Abstraction.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrowdFunding.Controllers
{
   
    [ApiController]
    [Route("/")]
    public class CampaignController : ControllerBase
    {
        private readonly ICampaignManager _campaignManager;
        public CampaignController(ICampaignManager campaignManager)
        {
            _campaignManager = campaignManager;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampaignDTO>>> GetCampaigns()
        {
            var campaigns = await _campaignManager.GetAllCampaigns();
            return Ok(campaigns);
        }
    }
}
