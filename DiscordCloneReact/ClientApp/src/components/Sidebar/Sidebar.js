import React from "react";

import ServerSidebar from "../ServerSidebar/ServerSidebar";
import ChannelSidebar from "../ChannelSidebar/ChannelSidebar";

import "./Sidebar.css";

function Sidebar(props) {
    const { currentChannel, setCurrentChannel, user, ...serverProps } = props;

    return (
        <div className="Sidebar">
            <ServerSidebar
                {...serverProps}
            />
            <ChannelSidebar
                {...props}
            />
        </div>
    );
}

export default Sidebar;
