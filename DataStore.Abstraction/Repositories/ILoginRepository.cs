using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.AbstractModels;
using DataStore.Abstraction.Models;

namespace DataStore.Abstraction.Repositories
{
    public interface ILoginRepository
    {
        Task<IUserModel> GetLoginDetails(string email);
    }
}
