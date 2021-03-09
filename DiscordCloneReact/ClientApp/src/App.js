import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Chat from './components/Chat';

import Sidebar from './components/Sidebar/Sidebar';

import ChannelMessages from './components/ChannelMessages/ChannelMessages';

import TestComponent from './components/TestComponent';

import './App.css'

var requestController = require('./api/requestController');

export default function App(){

    //static displayName = App.name;

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
          <div className="App">
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
