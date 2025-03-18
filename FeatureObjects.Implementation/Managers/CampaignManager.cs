using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.DTO;
using DataStore.Abstraction.Repositories;
using FeatureObjects.Abstraction.Managers;

namespace FeatureObjects.Implementation.Managers
{
    public class CampaignManager :  ICampaignManager
    {
        private readonly ICampaignRepository _campaignRepository;
        public CampaignManager(ICampaignRepository campaignRepository)
        {
            _campaignRepository = campaignRepository;
        }
        public async Task<IEnumerable<CampaignDTO>> GetAllCampaigns()
        {
            return await _campaignRepository.GetCampaigns();
        }
    }
}
