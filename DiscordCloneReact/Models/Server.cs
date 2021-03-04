using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace DiscordCloneReact.Models
{
    public class Server
    {
        public int ServerId { get; set; }

        [Required, StringLength(40)]
        public string ServerName { get; set; }

        public List<Channel> Channels { get; set; }
    }
}
