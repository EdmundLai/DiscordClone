import React from "react";
import { useFormik } from "formik";

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

export default ChannelModalContent;
