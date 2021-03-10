import React from "react";

function ServerItem(props) {
    const server = props.server;

    function getInitials(serverName) {
        const serverNameWords = serverName.split(" ");
        return serverNameWords.map((word) => word[0]).join("");
    }

    function setServer() {
        props.setCurrentServerAndChannel(server.serverId);
    }

    const serverInitials = getInitials(server.serverName);

    const cssServerItemClassName =
        props.selectedServer == null ||
            props.selectedServer.serverId !== server.serverId
            ? "ServerItem"
            : "SelectedServer ServerItem";

    return (
        <div onClick={setServer} className={cssServerItemClassName}>
            <span>{serverInitials}</span>
        </div>
    );
}

export default ServerItem;
