import React, { useState } from "react";

import ServerSidebar from "../ServerSidebar/ServerSidebar";
import ChannelSidebar from "../ChannelSidebar/ChannelSidebar";

import "./Sidebar.css";

function Sidebar(props) {
    const [serverListNeedsUpdate, setServerListNeedsUpdate] = useState(false);

    const channelSidebar =
        props.currentServer != null ? <ChannelSidebar
            setServerListNeedsUpdate={setServerListNeedsUpdate}
            {...props}
        /> : <></>;

    return (
        <div className="Sidebar">
            <ServerSidebar
                currentServer={props.currentServer}
                setCurrentServerAndChannel={props.setCurrentServerAndChannel}
                serverListNeedsUpdate={serverListNeedsUpdate}
                setServerListNeedsUpdate={setServerListNeedsUpdate}
            />
            {channelSidebar}
        </div>
    );
}

export default Sidebar;
