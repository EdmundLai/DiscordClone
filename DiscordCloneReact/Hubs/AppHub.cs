using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;
using DiscordCloneReact.Hubs.Clients;

namespace DiscordCloneReact.Hubs
{
    public class AppHub : Hub<IAppClient>
    {
        public async Task NotifyChannelAdded(int serverId)
        {
            await Clients.Others.ChannelAdded(serverId);
        }

        public async Task NotifyChannelDeleted(int serverId, int channelId)
        {
            await Clients.Others.ChannelDeleted(serverId, channelId);
        }

        public async Task NotifyServerAdded()
        {
            await Clients.Others.ServerAdded();
        }

        public async Task NotifyServerDeleted(int serverId)
        {
            await Clients.Others.ServerDeleted(serverId);
        }

        public async Task NotifyServerEdited(int serverId)
        {
            await Clients.Others.ServerEdited(serverId);
        }
    }
}
