using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;
using DiscordCloneReact.Hubs.Clients;
using DiscordCloneReact.Models;

namespace DiscordCloneReact.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }

        public async Task SendMessageToGroup(string groupName, ChatMessage message)
        {
            await Clients.Group(groupName).ReceiveMessage(message);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            //ChatMessage chatMessage = new ChatMessage
            //{
            //    User = "System",
            //    Message = $"{Context.ConnectionId} has joined the group {groupName}."
            //};

            //await Clients.Group(groupName).ReceiveMessage(chatMessage);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            //ChatMessage chatMessage = new ChatMessage
            //{
            //    User = "System",
            //    Message = $"{Context.ConnectionId} has left the group {groupName}."
            //};

            //await Clients.Group(groupName).ReceiveMessage(chatMessage);
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
