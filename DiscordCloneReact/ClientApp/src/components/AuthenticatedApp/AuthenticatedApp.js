import React, { useEffect, useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';

import ChannelMessages from '../ChannelMessages/ChannelMessages';

import './AuthenticatedApp.css';

var requestController = require('../../api/requestController');

function AuthenticatedApp(props) {
    const [currentServer, setCurrentServer] = useState(null);
    const [currentChannel, setCurrentChannel] = useState(null);


    useEffect(() => {
        const setInitialServerAndChannel = async () => {
            const servers = await requestController.getServers();
            if (servers.length > 0) {
                const initialServer = servers[0];
                console.log(initialServer);
                setCurrentServer(initialServer);
                const serverChannels = await requestController.getServerChannels(initialServer.serverId);
                if (serverChannels.length > 0) {
                    const initialChannel = serverChannels[0];
                    setCurrentChannel(initialChannel);
                }
            }
        }

        setInitialServerAndChannel();

    }, []);

    async function setInitialChannelFromServerId(serverId) {
        const serverChannels = await requestController.getServerChannels(serverId);
        if (typeof serverChannels !== 'undefined' && serverChannels.length > 0) {
            const initialChannel = serverChannels[0];
            setCurrentChannel(initialChannel);
            console.log(currentChannel);
        }
    }

    // if serverId is not passed in, reset currentServer and currentChannel
    async function setCurrentServerAndChannel(serverId) {
        if (typeof serverId == 'undefined') {
            setCurrentServer(null);
            setCurrentChannel(null);
        } else {
            const server = await requestController.getServerByServerId(serverId);
            setCurrentServer(server);
            await setInitialChannelFromServerId(serverId);
        }
    }

    const channelContent = currentChannel != null ? <ChannelMessages channel={currentChannel} /> : <></>;

    return (
        <div className="AuthenticatedApp">
            <Sidebar
                currentServer={currentServer}
                currentChannel={currentChannel}
                setCurrentChannel={setCurrentChannel}
                setCurrentServerAndChannel={setCurrentServerAndChannel}
            />
            {channelContent}
        </div>
    );
}

export default AuthenticatedApp;