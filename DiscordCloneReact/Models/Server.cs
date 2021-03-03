using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Models
{
    public class Server
    {
        public int ServerId { get; set; }

        public string ServerName { get; set; }

        public List<Channel> Channels { get; set; }
    }
}
