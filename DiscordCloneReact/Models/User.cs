using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace DiscordCloneReact.Models
{
    public class User
    {
        public int UserId { get; set; }

        [Required, StringLength(40)]
        public string UserName { get; set; }

        [StringLength(100)]
        public string UserPassword { get; set; }
    }
}
