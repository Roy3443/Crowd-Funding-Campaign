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
    public class InvestmentsListManager : IInvestmentListManager
    {
        private readonly IInvestmentListRepository _investmentListRepository;
        public InvestmentsListManager(IInvestmentListRepository investmentListRepository)
        {
            _investmentListRepository = investmentListRepository;
        }
        public async Task<IEnumerable<InvestmentListDTO>> InvestmentList(int UserId)
        {
            return await _investmentListRepository.GetInvestmentsAsync(UserId);
        }
    }
}
