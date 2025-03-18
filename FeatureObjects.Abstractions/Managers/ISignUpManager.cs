using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.AbstractModels;
using DataStore.Abstraction.Models;
using DataStore.Abstraction.Repositories;

namespace FeatureObjects.Abstraction.Managers
{
    public interface ISignUpManager
    {
        Task<string> SignUpUser(IUserModel user);
    }
}
