using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Models
{
    public class ServerMember
    {
        public int ServerMemberId { get; set; }

        public int ServerId { get; set; }
        public Server Server { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
