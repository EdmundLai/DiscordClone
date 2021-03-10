import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { SettingOutlined } from '@ant-design/icons';

import ChannelDetails from '../ChannelDetails/ChannelDetails';

import './ChannelSidebar.css';


var requestController = require('../../api/requestController');

function ChannelSidebar(props) {
    const [channels, setChannels] = useState([]);
    const [channelsNeedUpdate, setChannelsNeedUpdate] = useState(false);

    useEffect(() => {
        const getChannelsForServer = async () => {
            const channelData = await requestController.getServerChannels(props.currentServer.serverId);

            setChannels(channelData);
        }

        getChannelsForServer();
        setChannelsNeedUpdate(false);
    }, [props.currentServer, channelsNeedUpdate]);

    Modal.setAppElement('#root');

    function openServerSettingsModal() {
        console.log(`Opening server settings for ${props.currentServer.serverName}`);
    }

    return (
        <div className="ChannelSidebar">
            <div className="ServerSettingsHeader">
                <h3>{props.currentServer.serverName}</h3>
                <div className="ServerSettingsButton">
                    <SettingOutlined onClick={openServerSettingsModal} />
                </div>
            </div>
            <ChannelDetails
                {...props}
                setChannelsNeedUpdate={setChannelsNeedUpdate}
                channels={channels}
            />
            
        </div>
    );
}

export default ChannelSidebar;