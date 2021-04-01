import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Modal from 'react-modal';

import ChannelModalContent from '../ChannelModalContent/ChannelModalContent';
import ChannelItem from '../ChannelItem/ChannelItem';

import './ChannelDetails.css';

import requestController from '../../api/requestController';

function ChannelDetails(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const getChannelsForServer = async () => {
            const channelData = await requestController.getServerChannels(props.currentServer.serverId);
            if (isMounted) {
                setChannels(channelData);
            }
        }

        getChannelsForServer();
        props.setChannelsNeedUpdate(false);

        return () => { isMounted = false; }
    }, [props]);

    const channelContent = props.currentChannel !== null ? channels.map(channel => {
        return (
            <ChannelItem
                key={channel.channelId}
                channel={channel}
                setChannelsNeedUpdate={props.setChannelsNeedUpdate}
                {...props}
            />
        );
    }) : <></>;

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

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <div className="ChannelDetails" >
            <div className="ChannelsHeader">Text Channels
                    <span className="CreateChannelButton" onClick={openModal}><PlusOutlined /></span>
            </div>
            {channelContent}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <ChannelModalContent
                    currentServer={props.currentServer}
                    setCurrentServerAndChannel={props.setCurrentServerAndChannel}
                    setChannelsNeedUpdate={props.setChannelsNeedUpdate}
                    connection={props.connection}
                    closeModal={closeModal} />
            </Modal>
        </div>
    );
}

export default ChannelDetails;