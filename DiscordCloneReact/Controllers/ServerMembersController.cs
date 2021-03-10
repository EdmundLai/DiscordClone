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
    public class ServerMembersController : ControllerBase
    {
        readonly DiscordCloneContext discordCloneContext;

        public ServerMembersController(DiscordCloneContext discordCloneContext)
        {
            this.discordCloneContext = discordCloneContext;
        }

        [HttpGet]
        public IEnumerable<ServerMember> Get(int? serverId)
        {
            if (serverId.HasValue)
            {
                return discordCloneContext.ServerMembers.Where(s => s.ServerId == serverId).ToList();
            }
            return discordCloneContext.ServerMembers.ToList();
        }

        [HttpDelete("deleteByServerId")]
        public async Task DeleteServerMembersByServer(int serverId)
        {
            try
            {
                var serverMembers = discordCloneContext.ServerMembers.Where(sm => sm.ServerId == serverId);
                discordCloneContext.ServerMembers.RemoveRange(serverMembers);
                await discordCloneContext.SaveChangesAsync();
            } catch
            {
                throw;
            }
        }
    }
}
