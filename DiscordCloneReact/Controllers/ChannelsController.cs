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

        [HttpGet]
        public IEnumerable<Channel> Get(int? serverId)
        {
            if (serverId.HasValue)
            {
                return discordCloneContext.Channels.Where(c => c.ServerId == serverId).ToList();
            }
            return discordCloneContext.Channels.ToList();
        }
    }
}
