var axios = require("axios");

const apiEndpoint = "https://localhost:5001";

async function sendMessage(userId, channelId, messageContent) {
    try {
        const result = await axios.post(`${apiEndpoint}/api/Messages/create`, {
            "ChannelId": channelId,
            "UserId": userId,
            "CreationTime": Date.now(),
            "MessageContent": messageContent,
        });
        // error if result = null
        console.log(result);
    } catch (e) {
        console.log("Error from sendMessage");
        console.log(e);
    }
}

async function getServers() {
    try {
        const result = await axios.get(`${apiEndpoint}/api/Servers`);
        return result.data;
    } catch (e) {
        console.log("Error from getServers");
        console.log(e);
    }
}

async function getServerByServerId(serverId) {
    try {
        const result = await axios.get(`${apiEndpoint}/api/Servers/server?serverId=${serverId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getServerByServerId");
        console.log(e);
    }
}

async function getServerChannels(serverId) {
    try {
        const result = await axios.get(`${apiEndpoint}/api/Channels?serverId=${serverId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getServerChannels");
        console.log(e);
    }
}

async function getChannelByChannelId(channelId) {
    try {
        const result = await axios.get(`${apiEndpoint}/api/Channels/channel?channelId=${channelId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getChannelByChannelId");
        console.log(e);
    }
}

async function getChannelMessages(channelId) {
    try {
        const result = await axios.get(`${apiEndpoint}/api/Messages?channelId=${channelId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getChannelMessages");
        console.log(e);
    }
}

async function addChannelToServer(channelName, serverId) {
    try {
        const result = await axios.post(`${apiEndpoint}/api/Channels/create?channelName=${channelName}&serverId=${serverId}`);
        return result;
    } catch (e) {
        console.log("Error from addChannelToServer");
        console.log(e);
    }
}

async function deleteChannelFromServer(channelId) {
    try {
        // remove all messages from database with corresponding channelId
        const result = await axios.delete(`${apiEndpoint}/api/Messages/deleteByChannelId?channelId=${channelId}`);
        if (result) {
            // remove channel from database
            const result2 = await axios.delete(`${apiEndpoint}/api/Channels/delete?channelId=${channelId}`);
            return result2;
        }

        return false;
    } catch (e) {
        console.log("Error from deleteChannelFromServer");
        console.log(e);
    }
}

// creates a new server in the database
async function addNewServer(serverName) {
    try {
        const result = await axios.post(`${apiEndpoint}/api/Servers/create?serverName=${serverName}`);
        return result.data;
    } catch (e) {
        console.log("Error from addNewServer");
        console.log(e);
    }
}

async function editServerName(serverId, serverName) {
    try {
        await axios.post(`${apiEndpoint}/api/Servers/editServerName?serverId=${serverId}&newName=${serverName}`);
    } catch (e) {
        console.log("Error from editServerName");
        console.log(e);
    }
}

async function checkUserNameTaken(userName) {
    try {
        const result = await axios.get(`${apiEndpoint}/api/Users/userExists?userName=${userName}`);
        return result;
    } catch (e) {
        console.log("Error from checkUsernameNotTaken");
        console.log(e);
    }
}

async function addUser(userName, password) {
    try {
        await axios.post(`${apiEndpoint}/api/Users/addUser?userName=${userName}&password=${password}`);
    } catch (e) {
        console.log("Error from addUser");
        console.log(e);
    }
}

async function verifyUser(userName, password) {
    try {
        return await axios.post(`${apiEndpoint}/api/Users/verifyUser?userName=${userName}&password=${password}`);
    } catch (e) {
        console.log("Error from verifyUser");
        console.log(e);
    }
}

exports.editServerName = editServerName;
exports.sendMessage = sendMessage;
exports.getServers = getServers;
exports.getServerChannels = getServerChannels;
exports.getChannelMessages = getChannelMessages;
exports.getServerByServerId = getServerByServerId;
exports.getChannelByChannelId = getChannelByChannelId;
exports.addChannelToServer = addChannelToServer;
exports.deleteChannelFromServer = deleteChannelFromServer;
exports.addNewServer = addNewServer;
exports.checkUserNameTaken = checkUserNameTaken;
exports.addUser = addUser;
exports.verifyUser = verifyUser;