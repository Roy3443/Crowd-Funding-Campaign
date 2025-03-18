using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.DTO;
using DataStore.Abstraction.Models;

namespace FeatureObjects.Abstraction.Managers
{
    public interface IMyCampaignManager
    {
        Task<IEnumerable<CampaignDTO>> GetAllFundraiserCampaigns(int FundraiserId);
        Task<MyCampaignDTO> GetFundraiserCampaignDetails(int CampaignId);
        Task<bool> DeleteCampaign(int campaignId, int fundraiserId);
    }
}
