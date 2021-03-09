import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import ChannelModalContent from '../ChannelModalContent/ChannelModalContent';
import ChannelItem from '../ChannelItem/ChannelItem';

import './ChannelSidebar.css';

var requestController = require('../../api/requestController');

function ChannelSidebar(props) {
    const [channels, setChannels] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [channelsNeedUpdate, setChannelsNeedUpdate] = useState(false);

    useEffect(() => {
        const getChannelsForServer = async () => {
            const channelData = await requestController.getServerChannels(props.server.serverId);

            setChannels(channelData);
        }

        getChannelsForServer();
        setChannelsNeedUpdate(false);
    }, [props.server, channelsNeedUpdate]);

    const channelContent = props.channel !== null ? channels.map(channel => {
        return (
            <ChannelItem
                key={channel.channelId}
                channel={channel}
                currChannelId={props.channel.channelId}
                setCurrentChannel={props.setCurrentChannel}
                setCurrentServerAndChannel={props.setCurrentServerAndChannel}
                setChannelsNeedUpdate={setChannelsNeedUpdate}
                serverId={props.server.serverId}
            />
        );
    }) : <></>;

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#36393f',
            border: 'none',
            color: '#ffffff'
        }
    };

    Modal.setAppElement('#root');

    return (
        <div className="ChannelSidebar">
            <h3>{props.server.serverName}</h3>
            <div className="ChannelsHeader">Text Channels
                <span className="CreateChannelButton" onClick={openModal}>+</span>
            </div>
            {channelContent}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <ChannelModalContent
                    serverId={props.server.serverId}
                    setChannelsNeedUpdate={setChannelsNeedUpdate}
                    closeModal={closeModal} />
            </Modal>
        </div>
    );
}

export default ChannelSidebar;