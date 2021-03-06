import React from 'react';

import ServerSidebar from '../ServerSidebar/ServerSidebar';
import ChannelSidebar from '../ChannelSidebar/ChannelSidebar';

function Sidebar(props) {
    const channelSidebar = props.currentServer != null ?
        <ChannelSidebar serverId={props.currentServer.serverId} /> : <></>;

    return (
        <div className="Sidebar">
            <ServerSidebar />
            {channelSidebar}
        </div>
    );
}

export default Sidebar;