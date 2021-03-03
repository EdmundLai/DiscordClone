using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Models
{
    public class Channel
    {
        public int ChannelId { get; set; }

        public string ChannelName { get; set; }

        public int ServerId { get; set; }
        public Server Server { get; set; }

        public List<Message> Messages { get; set; }
    }
}
