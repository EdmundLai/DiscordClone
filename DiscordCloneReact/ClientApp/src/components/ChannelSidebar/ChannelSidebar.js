import React, { useState, useEffect } from 'react';

var requestController = require('../../api/requestController');

function ChannelSidebar(props) {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const getChannelsForServer = async () => {
            const channelData = await requestController.getServerChannels(props.serverId);

            setChannels(channelData);
        }

        getChannelsForServer();
    }, [props.serverId]);

    return (
        <div className="ChannelSidebar">
            <h2>Channels</h2>
            {channels.map(channel => {
                return (
                    <div key={channel.channelId}>
                        {channel.channelName}
                    </div>
                );
            })}
        </div>
    );
}

export default ChannelSidebar;