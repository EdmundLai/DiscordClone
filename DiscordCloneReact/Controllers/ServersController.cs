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
    public class ServersController : ControllerBase
    {
        readonly DiscordCloneContext discordCloneContext;

        public ServersController(DiscordCloneContext discordCloneContext)
        {
            this.discordCloneContext = discordCloneContext;
        }

        [HttpGet]
        public IEnumerable<Server> Get()
        {
            return discordCloneContext.Servers.ToList();
        }

        [HttpGet("server")]
        public async Task<Server> GetServerByServerId(int serverId)
        {
            return await discordCloneContext.Servers.FindAsync(serverId);
        }

        [HttpPost("create")]
        public async Task AddNewServer(string serverName)
        {
            Server newServer = new Server { ServerName = serverName };

            discordCloneContext.Servers.Add(newServer);
            await discordCloneContext.SaveChangesAsync();
        }
    }
}
