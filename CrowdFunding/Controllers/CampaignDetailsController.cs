using FeatureObjects.Abstraction.DTO;
using FeatureObjects.Abstraction.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrowdFunding.Controllers
{
    [ApiController]
    [Route("/campaign")]
    public class CampaignDetailsController : ControllerBase
    {
        private readonly ICampainDetailsManager _manager;
        public CampaignDetailsController(ICampainDetailsManager manager)
        {
            _manager = manager;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CampaignDetailDTO>> CampaignDetails(int id) {
            var details = await _manager.GetCampaignDetails(id);
            return Ok(details);

        }

    }


}
