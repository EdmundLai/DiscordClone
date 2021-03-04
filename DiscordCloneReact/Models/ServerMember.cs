using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace DiscordCloneReact.Models
{
    public class ServerMember
    {
        public int ServerMemberId { get; set; }

        [Required]
        public int ServerId { get; set; }
        public Server Server { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
