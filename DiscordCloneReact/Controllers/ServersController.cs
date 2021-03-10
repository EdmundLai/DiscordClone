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
        public async Task<Server> AddNewServer(string serverName)
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

        // Corresponding messages and server members must be deleted before server is deleted
        [HttpDelete("delete")]
        public async Task DeleteServer(int serverId)
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
    }
}
