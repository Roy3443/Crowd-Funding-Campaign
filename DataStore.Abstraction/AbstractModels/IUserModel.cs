using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStore.Abstraction.AbstractModels
{
    public interface IUserModel
    {
        int UserID { get; set; }
         string Name { get; set; }
         string Email { get; set; }
         string PasswordHash { get; set; }
         string Role { get; set; }
    }
}
