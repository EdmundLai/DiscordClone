import React from "react";
import { useFormik } from "formik";
import { Input, Button } from "antd";

import ModalTopBar from "../ModalTopBar/ModalTopBar";

import requestController from '../../api/requestController';

function ChannelModalContent(props) {
    const formik = useFormik({
        initialValues: { channelName: "" },
        onSubmit: async (values) => {
            //console.log(values.channelName);
            await createChannel(values.channelName);
            props.setChannelsNeedUpdate(true);
            props.closeModal();
        },
    });

    async function createChannel(channelName) {
        const newChannel = await requestController.addChannelToServer(
            channelName,
            props.currentServer.serverId
        );

        if (props.connection) {
            await props.connection.invoke("NotifyChannelAdded", props.currentServer.serverId);
        }

        await props.setCurrentServerAndChannel(props.currentServer.serverId, newChannel.channelId);
    }

    return (
        <div className="ChannelModalContent">
            <ModalTopBar title="Create New Channel" onClick={props.closeModal} />
            <form onSubmit={formik.handleSubmit}>
                <div className="ModalFormContent">
                    <label htmlFor="channelName">Channel Name: </label>
                    <br></br>
                    <Input
                        id="channelName"
                        name="channelName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.channelName}
                        required
                    />
                </div>
                <div className="ModalSubmitContainer">
                    <Button htmlType="submit">Create Channel</Button>
                </div>
            </form>
        </div>
    );
}

export default ChannelModalContent;
