using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Hubs.Clients
{
    public interface IAppClient
    {
        Task ChannelAdded(int serverId);

        Task ChannelDeleted(int serverId, int channelId);

        Task ServerAdded();

        Task ServerDeleted(int serverId);

        Task ServerEdited(int serverId);
    }
}
