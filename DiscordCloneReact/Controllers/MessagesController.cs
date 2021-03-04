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
    public class MessagesController : ControllerBase
    {
        readonly DiscordCloneContext discordCloneContext;

        public MessagesController(DiscordCloneContext discordCloneContext)
        {
            this.discordCloneContext = discordCloneContext;
        }

        [HttpGet]
        public IEnumerable<Message> Get(int? channelId)
        {
            if (channelId.HasValue)
            {
                return discordCloneContext.Messages.Where(m => m.ChannelId == channelId).ToList();
            }

            return discordCloneContext.Messages.ToList();
        }

        [HttpPost("Create")]
        public async Task<Message> Create(Message message)
        {
            try
            {
                discordCloneContext.Messages.Add(message);
                await discordCloneContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                throw;
            }

            return message;
        }

        [HttpPost("Edit")]
        public async Task<Message> Edit(int messageId, Message message)
        {
            try
            {
                var oldMessage = await discordCloneContext.Messages.FindAsync(messageId);
                oldMessage.MessageContent = message.MessageContent;
                discordCloneContext.Update(oldMessage);

                await discordCloneContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return message;
        }
    }
}
