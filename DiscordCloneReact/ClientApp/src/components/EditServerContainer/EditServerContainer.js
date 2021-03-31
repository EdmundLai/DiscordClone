import React from "react";

import { useFormik } from "formik";

import { Input, Button } from "antd";

var requestController = require("../../api/requestController");

function EditServerContainer(props) {

    const formik = useFormik({
        initialValues: { serverName: props.currentServer.serverName },
        onSubmit: async (values, { resetForm }) => {
            //console.log(values.serverName);
            await requestController.editServerName(props.currentServer.serverId, values.serverName);

            if (props.connection) {
                await props.connection.invoke("NotifyServerEdited", props.currentServer.serverId);
            }

            // state updates
            props.setCurrentServerAndChannel(props.currentServer.serverId);
            props.setServerListNeedsUpdate(true);

            resetForm();
            props.closeModal();
        },
    });

    return (
        <div className="EditServerContainer">
            <h4 className="ServerSettingsHeaderName">Edit Server</h4>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="serverName">Server Name: </label>
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
                    <Button htmlType="submit">Save Changes</Button>
                </div>
            </form>
        </div>
    );
}


export default EditServerContainer;