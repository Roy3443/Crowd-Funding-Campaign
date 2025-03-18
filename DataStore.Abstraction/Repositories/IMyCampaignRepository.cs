using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.DTO;

namespace DataStore.Abstraction.Repositories
{
    public interface IMyCampaignRepository
    {

        Task<IEnumerable<CampaignDTO>> GetFundraiserCampaigns(int fundraierId);
        Task<MyCampaignDTO> GetFundraiserCampaignDetails(int campaignId);
        Task<bool> DeleteCampaign(int campaignId, int fundraiserId);
    }
}
