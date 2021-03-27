using DiscordCloneReact.Data;
using DiscordCloneReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpPost("create")]
        public async Task<Channel> AddNewChannel(string channelName, int serverId)
        {
            Channel newChannel = new Channel { ChannelName = channelName, ServerId = serverId };

            discordCloneContext.Channels.Add(newChannel);
            await discordCloneContext.SaveChangesAsync();
            return newChannel;
        }

        [HttpDelete("delete")]
        public async Task<bool> DeleteChannel(int channelId)
        {
            try
            {
                Channel channel = discordCloneContext.Channels.Find(channelId);

                discordCloneContext.Channels.Remove(channel);

                await discordCloneContext.SaveChangesAsync();
                return true;
            }
            catch(DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        [HttpDelete("deleteByServerId")]
        public async Task DeleteByServerId(int serverId)
        {
            try
            {
                var channels = discordCloneContext.Channels.Where(c => c.ServerId == serverId);
                discordCloneContext.Channels.RemoveRange(channels);
                await discordCloneContext.SaveChangesAsync();
            } catch
            {
                throw;
            }
        }
    }
}
