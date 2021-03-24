import React from "react";

import ServerSettingsHeader from "../ServerSettingsHeader/ServerSettingsHeader";
import ChannelDetails from "../ChannelDetails/ChannelDetails";

import { SettingOutlined } from '@ant-design/icons';

import { ReactComponent as DiscordLogo } from '../../assets/Discord-Logo-White.svg';

import "./ChannelSidebar.css";

function ChannelSidebar(props) {

    // need to implement channelMainSectionContent when on homepage
    const channelMainSectionContent = props.currentServer !== null ? <>
        <ServerSettingsHeader currentServer={props.currentServer}
            setCurrentServerAndChannel={props.setCurrentServerAndChannel}
            setServerListNeedsUpdate={props.setServerListNeedsUpdate}
        />
        <ChannelDetails {...props} />
    </> : <></>;

    const userInfo = props.user !== null ? <UserInfo user={props.user} /> : <></>;

    return (
        <div className="ChannelSidebar">
            <div className="ChannelMainSection">
                {channelMainSectionContent}
            </div> 
            {userInfo}
        </div>
    );
}

// need to implement user settings
function UserInfo(props) {
    //console.log("Hello from UserInfo");
    //console.log(props.user);

    return (
        <div className="UserInfo">
            <div className="DiscordLogoContainer">
                <DiscordLogo className="DiscordLogo" />
            </div>
            <div className="UserInfoUsername">{props.user.userName}</div>
            <div className="UserInfoSettings">
                <SettingOutlined />
            </div>
        </div>
    );
}


export default ChannelSidebar;
