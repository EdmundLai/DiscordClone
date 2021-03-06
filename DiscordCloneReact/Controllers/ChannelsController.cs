using DiscordCloneReact.Data;
using DiscordCloneReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelsController : ControllerBase
    {
        readonly DiscordCloneContext discordCloneContext;

        public ChannelsController(DiscordCloneContext discordCloneContext)
        {
            this.discordCloneContext = discordCloneContext;
        }

        // gets all channels or all channels belonging to particular server
        [HttpGet]
        public IEnumerable<Channel> Get(int? serverId)
        {
            if (serverId.HasValue)
            {
                return discordCloneContext.Channels.Where(c => c.ServerId == serverId).ToList();
            }
            return discordCloneContext.Channels.ToList();
        }

        // get channel with the particular channel id
        [HttpGet("channel")]
        public async Task<Channel> GetChannelByChannelId(int channelId)
        {
            return await discordCloneContext.Channels.FindAsync(channelId);
        }
    }
}
