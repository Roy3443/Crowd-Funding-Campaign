using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.Repositories;
using FeatureObjects.Abstraction.DTO;
using FeatureObjects.Abstraction.Managers;

namespace FeatureObjects.Implementation.Managers
{
    public class CampaignDetailsManager : ICampainDetailsManager
    {
        private readonly ICampaignDetailsRepository _campaignDetailsRepository;
        public CampaignDetailsManager(ICampaignDetailsRepository campaignDetailsRepository)
        {
            _campaignDetailsRepository = campaignDetailsRepository;
        }
        public async Task<CampaignDetailDTO> GetCampaignDetails(int campaignID)
        {
            return await _campaignDetailsRepository.GetCampaignDetails(campaignID);
        }

    }
}
