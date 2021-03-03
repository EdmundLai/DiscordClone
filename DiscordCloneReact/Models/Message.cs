using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Models
{
    public class Message
    {
        public int MessageId { get; set; }

        public int ChannelId { get; set; }
        public Channel Channel { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime CreationTime { get; set; }

        public string Content { get; set; }
    }
}
