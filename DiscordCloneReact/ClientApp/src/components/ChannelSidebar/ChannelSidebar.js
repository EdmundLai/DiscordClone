import React, { useState, useEffect } from 'react';

import './ChannelSidebar.css';

var requestController = require('../../api/requestController');

function ChannelSidebar(props) {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const getChannelsForServer = async () => {
            const channelData = await requestController.getServerChannels(props.server.serverId);

            setChannels(channelData);
        }

        getChannelsForServer();
    }, [props.server]);

    const channelContent = props.channel !== null ? channels.map(channel => {
        return (
            <ChannelItem
                key={channel.channelId}
                channel={channel}
                currChannelId={props.channel.channelId}
                setCurrentChannel={props.setCurrentChannel}
            />
        );
    }) : <></>;

    function createChannel() {

    }

    return (
        <div className="ChannelSidebar">
            <h3>{props.server.serverName}</h3>
            <div className="ChannelsHeader">Text Channels
                <span className="CreateChannelButton" onClick={createChannel}>+</span>
            </div>
            {channelContent}
        </div>
    );
}

function ChannelItem(props) {

    const channel = props.channel;

    const currChannelId = props.currChannelId;

    const channelTextClass =
        channel.channelId === currChannelId ? "CurrentChannel" : "";

    function changeChannel() {
        props.setCurrentChannel(channel);
    }

    return (
        <div className="ChannelItem" onClick={changeChannel}>
            <span className={channelTextClass}># {channel.channelName}</span>
        </div>
        );
}

export default ChannelSidebar;