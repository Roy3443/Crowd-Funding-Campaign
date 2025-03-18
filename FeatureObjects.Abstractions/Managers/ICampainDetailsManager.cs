using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FeatureObjects.Abstraction.DTO;

namespace FeatureObjects.Abstraction.Managers
{
    public interface ICampainDetailsManager
    {
        Task<CampaignDetailDTO> GetCampaignDetails(int campaignID);
    }
}
