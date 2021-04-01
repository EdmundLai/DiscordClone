import React from "react";
import { useFormik } from "formik";
import { Input, Button } from "antd";

import ModalTopBar from "../ModalTopBar/ModalTopBar";

import requestController from '../../api/requestController';

function ServerModalContent(props) {
    async function createNewServer(serverName) {
        const server = await requestController.addNewServer(serverName);
        await requestController.addChannelToServer("general", server.serverId);

        if (props.connection) {
            await props.connection.invoke("NotifyServerAdded");
        }

        return server.serverId;
    }

    const formik = useFormik({
        initialValues: { serverName: "" },
        onSubmit: async (values, { resetForm }) => {
            //console.log(values.serverName);
            const serverId = await createNewServer(values.serverName);
            //console.log(`created serverId: ${serverId}`);
            props.setServerListNeedsUpdate(true);
            props.setCurrentServerAndChannel(serverId);
            resetForm();
            props.closeModal();
        },
    });

    return (
        <div className="ServerModalContent">
            <ModalTopBar title="Create Server" onClick={props.closeModal} />
            <form onSubmit={formik.handleSubmit}>
                <div className="ModalFormContent">
                    <label htmlFor="serverName">Server Name: </label>
                    <br></br>
                    <Input
                        id="serverName"
                        name="serverName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.serverName}
                        required
                    />
                </div>
                <div className="ModalSubmitContainer">
                    <Button htmlType="submit">Create Server</Button>
                </div>
            </form>
        </div>
    );
}

export default ServerModalContent;
