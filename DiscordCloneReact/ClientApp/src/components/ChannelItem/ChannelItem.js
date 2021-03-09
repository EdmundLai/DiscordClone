import React, { useState } from 'react';
import Modal from 'react-modal';

import './ChannelItem.css'

var requestController = require('../../api/requestController');

function ChannelItem(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const channel = props.channel;

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

    const currChannelId = props.currChannelId;

    const channelTextClass =
        channel.channelId === currChannelId ? "CurrentChannel ChannelText" : "ChannelText";

    function changeChannel() {
        props.setCurrentChannel(channel);
    }

    async function deleteChannelAndClose() {
        //console.log(`deleting channel with channel id of ${channel.channelId}`);
        await requestController.deleteChannelFromServer(channel.channelId);
        props.setChannelsNeedUpdate(true);
        props.setCurrentServerAndChannel(props.serverId);

        closeModal();
    }

    return (
        <div className="ChannelItem" >
            <span onClick={changeChannel} className={channelTextClass}># {channel.channelName}</span>
            <span className="ChannelDeleteButton" onClick={openModal}>X</span>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <div className="DeleteChannelModal">
                    <h4>Delete Channel</h4>
                    <p>Are you sure you want to delete # {channel.channelName}?</p>
                    <div className="DeleteChannelModalButtons">
                        <button onClick={closeModal}>Cancel</button>
                        <button onClick={deleteChannelAndClose}>Confirm</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ChannelItem;