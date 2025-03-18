using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.AbstractModels;
using DataStore.Abstraction.Models;
using DataStore.Abstraction.Repositories;
using FeatureObjects.Abstraction.Managers;

namespace FeatureObjects.Implementation.Managers
{
    public class CreateCampaignManager : ICreateCampaignManager
    {
        private readonly ICreateCampaignRepository _repository;
        public CreateCampaignManager(ICreateCampaignRepository repository)
        {
            _repository = repository;
        }
        public async Task<bool> CreateCampaign(ICampaignModel campaign)
        {
            return await _repository.CreateCampaign(campaign);
        }
    }
}
