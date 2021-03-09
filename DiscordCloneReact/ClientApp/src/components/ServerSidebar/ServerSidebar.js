import React, { useState, useEffect } from "react";

import './ServerSidebar.css';

var requestController = require('../../api/requestController');

function ServerSidebar(props) {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        const getServers = async () => {
            const serverData = await requestController.getServers();

            setServers(serverData);
        }

        getServers();
    }, []);

    function resetServer() {
        props.setCurrentServerAndChannel();
    }

    const serverHomeCssClass = props.currentServer == null ? "SelectedServer ServerHome" : "ServerHome";

    return (
        <div className="ServerSidebar">
            <div onClick={resetServer} className={serverHomeCssClass}>Home</div>
            {servers.map((server) => {
                return (
                    <ServerItem
                        selectedServer={props.currentServer}
                        key={server.serverId}
                        server={server}
                        setCurrentServerAndChannel={props.setCurrentServerAndChannel}
                    />
                );
            })}
            <div className="NewServerButton">+</div>
        </div>
    );
}

function ServerItem(props) {
    const server = props.server;

    function getInitials(serverName) {
        const serverNameWords = serverName.split(" ");
        return serverNameWords.map(word => word[0]).join("");
    }

    function setServer() {
        props.setCurrentServerAndChannel(server.serverId);
    }

    const serverInitials = getInitials(server.serverName);

    const cssServerItemClassName = props.selectedServer == null || props.selectedServer.serverId !== server.serverId ? "ServerItem" : "SelectedServer ServerItem";

    return (
        <div onClick={setServer} className={cssServerItemClassName}>
            <span>{serverInitials}</span>
        </div>
        );
}

export default ServerSidebar;