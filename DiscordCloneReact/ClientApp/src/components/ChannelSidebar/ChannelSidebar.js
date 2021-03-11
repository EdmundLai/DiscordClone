import React from "react";

import ServerSettingsHeader from "../ServerSettingsHeader/ServerSettingsHeader";
import ChannelDetails from "../ChannelDetails/ChannelDetails";

import "./ChannelSidebar.css";

function ChannelSidebar(props) {
    return (
        <div className="ChannelSidebar">
            <ServerSettingsHeader currentServer={props.currentServer}
                setCurrentServerAndChannel={props.setCurrentServerAndChannel}
                setServerListNeedsUpdate={props.setServerListNeedsUpdate}
            />
            <ChannelDetails {...props} />
        </div>
    );

}

export default ChannelSidebar;
