import React, { useState, useEffect } from "react";

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
            <h2>List of servers</h2>
            {servers.map(server => {
                return (
                    <div key={ server.serverId }>
                        {server.serverName}
                    </div>
                );
            })}
        </div>
    );
}

export default ServerSidebar;