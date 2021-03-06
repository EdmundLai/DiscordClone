﻿using DiscordCloneReact.Data;
using DiscordCloneReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace DiscordCloneReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        readonly DiscordCloneContext discordCloneContext;

        private readonly ILogger<MessagesController> _logger;

        public MessagesController(DiscordCloneContext discordCloneContext, ILogger<MessagesController> logger)
        {
            this.discordCloneContext = discordCloneContext;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<object> Get(int? channelId)
        {
            var query = from message in discordCloneContext.Set<Message>()
                        join user in discordCloneContext.Set<User>()
                        on message.UserId equals user.UserId
                        select new
                        {
                            message.MessageId,
                            message.ChannelId,
                            message.UserId,
                            user.UserName,
                            message.CreationTime,
                            message.MessageContent
                        };

            if (channelId.HasValue)
            {
                return query.Where(m => m.ChannelId == channelId);
                //return discordCloneContext.Messages.Where(m => m.ChannelId == channelId).ToList();
            }

            return query;
        }

        [HttpPost("Create")]
        public async Task<Message> Create([FromBody] JSMessage messageObj)
        {
            _logger.LogInformation(messageObj.MessageContent);

            var offset = DateTimeOffset.FromUnixTimeMilliseconds(messageObj.CreationTime);

            var creationTime = offset.UtcDateTime;

            Message message = new Message
            {
                ChannelId = messageObj.ChannelId,
                UserId = messageObj.UserId,
                CreationTime = creationTime,
                MessageContent = messageObj.MessageContent
            };

            //figure out database add later
            try
            {
                discordCloneContext.Messages.Add(message);
                await discordCloneContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }

            return message;
        }

        //[HttpPost("Edit")]
        //public async Task<Message> Edit(int messageId, Message message)
        //{
        //    try
        //    {
        //        var oldMessage = await discordCloneContext.Messages.FindAsync(messageId);
        //        oldMessage.MessageContent = message.MessageContent;
        //        discordCloneContext.Update(oldMessage);

        //        await discordCloneContext.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        throw;
        //    }

        //    return message;
        //}
    }

    public class JSMessage
    {
        public int ChannelId { get; set; }
        public int UserId { get; set; }
        public long CreationTime { get; set; }
        public string MessageContent { get; set; }
    }
}
