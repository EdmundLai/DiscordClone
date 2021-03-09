import React from 'react';

import { useFormik } from 'formik';

var requestController = require('../../api/requestController');

function ServerModalContent(props) {

    async function createNewServer(serverName) {
        const server = await requestController.addNewServer(serverName);
        await requestController.addChannelToServer("general", server.serverId);
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
        }
    });

    return (
        <div className="ServerModalContent">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="serverName">Server Name: </label>
                <br></br>
                <input
                    id="serverName"
                    name="serverName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.serverName}
                    required
                />
                <div>
                    <button onClick={props.closeModal}>Cancel</button>
                    <button type="submit">Create Server</button>
                </div>
            </form>
        </div>
        );
}

export default ServerModalContent;