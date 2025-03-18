using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataStore.Abstraction.AbstractModels;
using Newtonsoft.Json;

namespace DataStore.Abstraction.Models
{
    public class UserModel : IUserModel
    {
        //[JsonProperty(PropertyName="UserId")]
        public int UserID { get; set; }
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }
    }
    

}
