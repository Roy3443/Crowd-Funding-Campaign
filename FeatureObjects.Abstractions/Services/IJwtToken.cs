using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.AbstractModels;
using DataStore.Abstraction.Models;

namespace FeatureObjects.Abstraction.Services
{
    public interface IJwtToken
    {
        string GenerateJwtToken(IUserModel user);
    }
}
