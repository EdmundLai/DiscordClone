import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
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
        const getServer1 = async () => {
            const server = await requestController.getServerByServerId(1);
            setCurrentServer(server);
        }

        const getChannel1 = async () => {
            const channel = await requestController.getChannelByChannelId(1);
            console.log(channel);
            setCurrentChannel(channel);
        }

        getServer1();
        getChannel1();

    }, []);

    const channelContent = currentChannel != null ? <ChannelMessages channel={currentChannel} /> : <></>;

    return (
          <div className="App">
            <Sidebar
                currentServer={currentServer}
                currentChannel={currentChannel}
                setCurrentChannel={setCurrentChannel}
            />
            {channelContent}
        </div>
    );

}


