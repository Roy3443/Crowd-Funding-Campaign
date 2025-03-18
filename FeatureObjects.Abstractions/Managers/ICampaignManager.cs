using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.DTO;

namespace FeatureObjects.Abstraction.Managers
{
    public interface ICampaignManager
    {
        Task<IEnumerable<CampaignDTO>> GetAllCampaigns();
    }
}
