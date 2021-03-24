import React, { useState } from "react";

import ServerSidebar from "../ServerSidebar/ServerSidebar";
import ChannelSidebar from "../ChannelSidebar/ChannelSidebar";

import "./Sidebar.css";

function Sidebar(props) {
    const [serverListNeedsUpdate, setServerListNeedsUpdate] = useState(false);

    return (
        <div className="Sidebar">
            <ServerSidebar
                currentServer={props.currentServer}
                setCurrentServerAndChannel={props.setCurrentServerAndChannel}
                serverListNeedsUpdate={serverListNeedsUpdate}
                setServerListNeedsUpdate={setServerListNeedsUpdate}
                logout={props.logout}
            />
            <ChannelSidebar
                setServerListNeedsUpdate={setServerListNeedsUpdate}
                {...props}
            />
        </div>
    );
}

export default Sidebar;
