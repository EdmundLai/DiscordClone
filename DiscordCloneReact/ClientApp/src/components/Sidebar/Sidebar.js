import React from 'react';

import ServerSidebar from '../ServerSidebar/ServerSidebar';
import ChannelSidebar from '../ChannelSidebar/ChannelSidebar';

import './Sidebar.css';

function Sidebar(props) {
    const channelSidebar = props.currentServer != null ?
        <ChannelSidebar
            server={props.currentServer}
            channel={props.currentChannel}
            setCurrentChannel={props.setCurrentChannel}
            setCurrentServerAndChannel={props.setCurrentServerAndChannel}
        /> : <></>;

    return (
        <div className="Sidebar">
            <ServerSidebar
                currentServer={props.currentServer}
                setCurrentServerAndChannel={props.setCurrentServerAndChannel}
            />
            {channelSidebar}
        </div>
    );
}

export default Sidebar;