import React from "react";
import { useFormik } from "formik";

import { CloseOutlined } from "@ant-design/icons";

var requestController = require("../../api/requestController");

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
        await requestController.addChannelToServer(
            channelName,
            props.currentServer.serverId
        );
    }

    return (
        <div className="ChannelModalContent">
            <div className="TopBarModal">
                <h3 className="ModalHeader">Create New Channel</h3>
                <CloseOutlined onClick={props.closeModal} />
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="ModalFormContent">
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
                </div>
                <div className="ModalSubmitContainer">
                    <button type="submit">Create Channel</button>
                </div>
            </form>
        </div>
    );
}

export default ChannelModalContent;
