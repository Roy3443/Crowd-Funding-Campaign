﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.DTO;

namespace DataStore.Abstraction.Repositories
{
    public interface IInvestmentDetailRepository
    {
        Task<InvestmentDetailDTO> GetUniqueInvestmentDetails(int campaignId, int userId);
    }
}
