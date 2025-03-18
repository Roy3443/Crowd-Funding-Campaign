using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeatureObjects.Abstraction.Services
{
    public interface IPasswordHashingService
    {
        string HashPassword(string password);
    }
}
