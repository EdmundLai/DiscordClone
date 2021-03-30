import React from "react";

import { Button } from "antd";

var requestController = require("../../api/requestController");

function DeleteServerContainer(props) {
    async function deleteServer() {
        // implement deleting server here
        await requestController.deleteServer(props.currentServer.serverId)

        props.setServerListNeedsUpdate(true);
        props.setCurrentServerAndChannel();

        console.log("Server deleted!");
        props.closeModal();
    }

    return (
        <div>
            <h4 className="ServerSettingsHeaderName">Delete Server</h4>
            <p>Do you really want to delete the server {props.currentServer.serverName}?</p>
            <div className="ModalSubmitContainer">
                <Button type="danger" onClick={deleteServer}>Confirm</Button>
            </div>
        </div>
    );
}

export default DeleteServerContainer;