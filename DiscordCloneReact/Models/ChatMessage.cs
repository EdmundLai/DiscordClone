using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Models
{
    public class ChatMessage
    {
        public string UserName { get; set; }

        public string MessageContent { get; set; }

        public string ChannelId { get; set; }
    }
}
