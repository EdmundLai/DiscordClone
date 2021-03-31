import React, { useState } from 'react';
import Modal from 'react-modal';

import {
    CloseOutlined
} from '@ant-design/icons';

import { Button } from "antd";

import ModalTopBar from "../ModalTopBar/ModalTopBar";

import './ChannelItem.css'

var requestController = require('../../api/requestController');

function ChannelItem(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    const channelTextClass =
        props.channel.channelId === props.currentChannel.channelId ? "CurrentChannel ChannelText" : "ChannelText";

    function changeChannel() {
        const newChannel = { ...props.channel };

        props.setCurrentChannel(newChannel);
    }

    async function deleteChannelAndClose() {
        //console.log(`deleting channel with channel id of ${channel.channelId}`);
        await requestController.deleteChannelFromServer(props.channel.channelId);

        if (props.connection) {
            await props.connection.invoke("NotifyChannelDeleted", props.currentServer.serverId, props.channel.channelId);
        }

        props.setChannelsNeedUpdate(true);
        props.setCurrentServerAndChannel(props.currentServer.serverId);

        closeModal();
    }

    return (
        <div className="ChannelItem" >
            <span onClick={changeChannel} className={channelTextClass}># {props.channel.channelName}</span>
            <span className="ChannelDeleteButton" onClick={openModal}><CloseOutlined /></span>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <div className="DeleteChannelModal">
                    <ModalTopBar title="Delete Channel" onClick={closeModal} />
                    <p>Are you sure you want to delete # {props.channel.channelName}?</p>
                    <div className="ModalSubmitContainer">
                        <Button onClick={deleteChannelAndClose}>Confirm</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ChannelItem;