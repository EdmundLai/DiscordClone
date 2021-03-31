import React, { useEffect, useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';

import ChannelMessages from '../ChannelMessages/ChannelMessages';

import './AuthenticatedApp.css';

var requestController = require('../../api/requestController');

function AuthenticatedApp(props) {
    const [currentServer, setCurrentServer] = useState(null);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [user, setUser] = useState(null);

    const [serverListNeedsUpdate, setServerListNeedsUpdate] = useState(false);
    const [channelsNeedUpdate, setChannelsNeedUpdate] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const setInitialServerAndChannel = async () => {
            const servers = await requestController.getServers();
            if (servers.length > 0) {
                const initialServer = servers[0];
                console.log(initialServer);
                if (isMounted) {
                    setCurrentServer(initialServer);
                }
                const serverChannels = await requestController.getServerChannels(initialServer.serverId);
                if (serverChannels.length > 0) {
                    const initialChannel = serverChannels[0];
                    if (isMounted) {
                        setCurrentChannel(initialChannel);
                    }
                }
            }
        }

        const getUser = async () => {
            const currUser = await requestController.getUser(props.loggedInUserId);
            if (isMounted) {
                setUser(currUser);
            }
        }

        const initApp = async() => {
            await getUser();

            await setInitialServerAndChannel();
        }

        initApp();

        return () => { isMounted = false; }
    }, [props.loggedInUserId]);

    async function setInitialChannelFromServerId(serverId) {
        const serverChannels = await requestController.getServerChannels(serverId);
        if (typeof serverChannels !== 'undefined' && serverChannels.length > 0) {
            const initialChannel = serverChannels[0];
            setCurrentChannel(initialChannel);
            //console.log(currentChannel);
        } else {
            setCurrentChannel(null);
        }
    }

    // if serverId is not passed in, reset currentServer and currentChannel
    async function setCurrentServerAndChannel(serverId, channelId) {
        if (typeof serverId == 'undefined') {
            setCurrentServer(null);
            setCurrentChannel(null);
        } else if (typeof channelId == "undefined") {
            const server = await requestController.getServerByServerId(serverId);
            setCurrentServer(server);
            await setInitialChannelFromServerId(serverId);
        } else {
            const server = await requestController.getServerByServerId(serverId);
            setCurrentServer(server);
            const channel = await requestController.getChannelByChannelId(channelId);
            setCurrentChannel(channel);
        }
    }

    const channelContent = currentChannel !== null ?
        <ChannelMessages
            channel={currentChannel}
            user={user}
        /> : (currentServer !== null ? <></> : <HomepageContent user={user}/>);

    return (
        <div className="AuthenticatedApp">
            <Sidebar
                currentServer={currentServer}
                currentChannel={currentChannel}
                setCurrentChannel={setCurrentChannel}
                setCurrentServerAndChannel={setCurrentServerAndChannel}
                serverListNeedsUpdate={serverListNeedsUpdate}
                setServerListNeedsUpdate={setServerListNeedsUpdate}
                channelsNeedUpdate={channelsNeedUpdate}
                setChannelsNeedUpdate={setChannelsNeedUpdate}
                user={user}
                logout={props.logout}
            />
            {channelContent}
        </div>
    );
}

function HomepageContent(props) {
    const greetingMessage = props.user == null ? "Welcome to DiscordClone!" : `Welcome to DiscordClone, ${props.user.userName}!`;

    return (
        <div className="HomepageContent">
            <h1 className="HomepageHeader">{greetingMessage}</h1>
        </div>
    );
}

export default AuthenticatedApp;