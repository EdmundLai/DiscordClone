import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Modal from 'react-modal';

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

function ChannelModalContent(props) {

    const formik = useFormik({
        initialValues: { channelName: "" },
        onSubmit: async (values) => {
            //console.log(values.channelName);
            await createChannel(values.channelName);
            props.setChannelsNeedUpdate(true);
            props.closeModal();
        }
    });

    async function createChannel(channelName) {
        await requestController.addChannelToServer(channelName, props.serverId);
    }

    return (
        <div className="ChannelModalContent">
            <h3>Create New Channel</h3>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="channelName">Channel Name: </label>
                <br></br>
                <input
                    id="channelName"
                    name="channelName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.channelName}
                    required
                />
                <div>
                    <button onClick={props.closeModal}>Cancel</button>
                    <button type="submit">Create Channel</button>
                </div>
            </form>
        </div>
    );
}

function ChannelItem(props) {

    const channel = props.channel;

    const currChannelId = props.currChannelId;

    const channelTextClass =
        channel.channelId === currChannelId ? "CurrentChannel" : "";

    function changeChannel() {
        props.setCurrentChannel(channel);
    }

    return (
        <div className="ChannelItem" onClick={changeChannel}>
            <span className={channelTextClass}># {channel.channelName}</span>
        </div>
        );
}

export default ChannelSidebar;