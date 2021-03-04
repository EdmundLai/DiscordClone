using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace DiscordCloneReact.Models
{
    public class Channel
    {
        public int ChannelId { get; set; }

        [Required, StringLength(40)]
        public string ChannelName { get; set; }

        [Required]
        public int ServerId { get; set; }
        public Server Server { get; set; }

        public List<Message> Messages { get; set; }
    }
}
