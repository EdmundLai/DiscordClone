using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace DiscordCloneReact.Models
{
    public class Message
    {
        public int MessageId { get; set; }

        [Required]
        public int ChannelId { get; set; }
        public Channel Channel { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [StringLength(1000)]
        public string MessageContent { get; set; }
    }
}
