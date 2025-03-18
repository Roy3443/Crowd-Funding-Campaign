using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeatureObjects.Abstraction.Managers
{
    public interface ILoginManager
    {
        Task<string> ValidateUser(string password, string email);
    }
}
