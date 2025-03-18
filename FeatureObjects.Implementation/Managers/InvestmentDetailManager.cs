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
    public class InvestmentDetailManager : IInvestmentDetailManager
    {
        private readonly IInvestmentDetailRepository _repository;
        public InvestmentDetailManager(IInvestmentDetailRepository repository)
        {
            _repository = repository;
        }
        public async Task<InvestmentDetailDTO> GetUniqueInvestmentDetailsAsync(int campaignId, int userId)
        {

            return await _repository.GetUniqueInvestmentDetails(campaignId, userId);
        }
    }
}
