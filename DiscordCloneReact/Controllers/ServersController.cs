﻿using DiscordCloneReact.Data;
using DiscordCloneReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
        public async Task<Server> GetServerByServerId([FromQuery] int serverId)
        {
            return await discordCloneContext.Servers.FindAsync(serverId);
        }

        [HttpPost("create")]
        public async Task<Server> AddNewServer([FromQuery] string serverName)
        {
            try
            {
                Server newServer = new Server { ServerName = serverName };

                var createdServer = discordCloneContext.Servers.Add(newServer).Entity;
                await discordCloneContext.SaveChangesAsync();
                return createdServer;
            } catch
            {
                return null;
            }
        }

        // Corresponding messages, server members, and channels must be deleted before server is deleted
        [HttpDelete("delete")]
        public async Task DeleteServer([FromQuery] int serverId)
        {
            try
            {
                var server = discordCloneContext.Servers.Find(serverId);
                discordCloneContext.Servers.Remove(server);
                await discordCloneContext.SaveChangesAsync();
            } catch
            {
                throw;
            }
        }

        [HttpPost("editServerName")]
        public async Task EditServerName([FromQuery] int serverId, [FromQuery] string newName)
        {
            try
            {
                var server = discordCloneContext.Servers.Find(serverId);
                server.ServerName = newName;
                await discordCloneContext.SaveChangesAsync();
            } catch
            {
                throw;
            }
            
        }
    }
}
