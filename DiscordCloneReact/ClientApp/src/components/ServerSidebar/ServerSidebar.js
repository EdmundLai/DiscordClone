import React, { useState, useEffect } from "react";

import './ServerSidebar.css';

var requestController = require('../../api/requestController');

function ServerSidebar() {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        const getServers = async () => {
            const serverData = await requestController.getServers();

            setServers(serverData);
        }

        getServers();
    }, []);

    return (
        <div className="ServerSidebar">
            {servers.map(server => {
                return (
                    <ServerItem key={server.serverId} server={server} />
                );
            })}
        </div>
    );
}

function ServerItem(props) {
    const server = props.server;

    function getInitials(serverName) {
        const serverNameWords = serverName.split(" ");
        return serverNameWords.map(word => word[0]).join("");
    }

    const serverInitials = getInitials(server.serverName);

    return (
        <div className="ServerItem">
            <span>{serverInitials}</span>
        </div>
        );
}

export default ServerSidebar;