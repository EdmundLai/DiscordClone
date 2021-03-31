import React, { useCallback, useEffect, useState } from 'react';

import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

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

    const [connection, setConnection] = useState(null);

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

    // create new connection to apphub
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/apphub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        console.log("setConnection from AuthenticatedApp called!");
    }, []);

    // will refactor these later

    // ??? why is currentServer and currentChannel null in these callbacks?

    // if serverId is not passed in, reset currentServer and currentChannel
    const setCurrentServerAndChannel = useCallback(async (serverId, channelId) => {
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
    }, []);

    const handleChannelAdded = useCallback((serverId) => {
        console.log("handleChannelAdded called.");
        //console.log(currentServer);
        //console.log(currentChannel);
        //console.log(setChannelsNeedUpdate);
        ////console.log(`current server: ${currentServer.serverId}`);
        ////console.log(`deleted server: ${serverId}`);
        //// check if current server has same serverId
        //if (currentServer.serverId === serverId) {
        //    console.log("the serverIds match");
        //    // if they match, get ChannelSidebar to update channels
        setChannelsNeedUpdate(true);
        //} else {
        //    console.log("the serverIds don't match");
        //}
        //console.log("end of handleChannelAdded called.")
        //// else, don't do anything
    }, []);

    const handleChannelDeleted = useCallback(async (serverId, channelId) => {
        console.log("handleChannelDeleted called.");
        //console.log(currentServer);
        //console.log(currentChannel);
        //console.log(setCurrentServerAndChannel);
        //console.log(`current server: ${currentServer.serverId}`);
        //console.log(`deleted server: ${serverId}`);

        // check if current server has same serverId
        //if (currentServer.serverId === serverId) {
        //    // if serverIds match, check if current channel has the same channelId
        //    if (currentChannel.channelId === channelId) {
        //        // if channelIds match, call setCurrentServerAndChannel(serverId)
        //        // to reinitialize current channel
        await setCurrentServerAndChannel(serverId);
        //    }
            // also get ChannelSidebar to update channels regardless if channelIds match
        setChannelsNeedUpdate(true);
        //}
        // if not, don't do anything

        //console.log("end of handleChannelDeleted called.")
    }, [setCurrentServerAndChannel]);

    const handleServerDeleted = useCallback(async (serverId) => {
        //// check if current server matches serverId
        //if (currentServer.serverId === serverId) {
        //    // if they match, call setCurrentServerAndChannel(),
        //    // setting both currentChannel and currentServer to null
        await setCurrentServerAndChannel();
        //}
        //// also get serverSidebar to update servers
        setServerListNeedsUpdate(true);
    }, [setCurrentServerAndChannel]);


    useEffect(() => {

        const handleServerAdded = () => {
            // get serverSidebar to update servers
            setServerListNeedsUpdate(true);
        }

        const setUpConnection = async () => {

            console.log("app connection initialized");
            if (connection) {
                if (connection.state === HubConnectionState.Disconnected) {
                    await connection.start();
                }

                connection.on("ChannelAdded", handleChannelAdded);
                connection.on("ChannelDeleted", handleChannelDeleted);
                connection.on("ServerAdded", handleServerAdded);
                connection.on("ServerDeleted", handleServerDeleted);
            }
        }

        setUpConnection();

        return () => {
            // release message handlers
            console.log("app connection removed");
            if (connection) {
                connection.off("ChannelAdded", handleChannelAdded);
                connection.off("ChannelDeleted", handleChannelDeleted);
                connection.off("ServerAdded", handleServerAdded);
                connection.off("ServerDeleted", handleServerDeleted);
            }
        };
    }, [connection, handleChannelAdded, handleChannelDeleted, handleServerDeleted]);

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
    //async function setCurrentServerAndChannel(serverId, channelId) {
    //    if (typeof serverId == 'undefined') {
    //        setCurrentServer(null);
    //        setCurrentChannel(null);
    //    } else if (typeof channelId == "undefined") {
    //        const server = await requestController.getServerByServerId(serverId);
    //        setCurrentServer(server);
    //        await setInitialChannelFromServerId(serverId);
    //    } else {
    //        const server = await requestController.getServerByServerId(serverId);
    //        setCurrentServer(server);
    //        const channel = await requestController.getChannelByChannelId(channelId);
    //        setCurrentChannel(channel);
    //    }
    //}

    

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
                connection={connection}
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