var axios = require("axios");

async function sendMessage(userId, channelId, messageContent) {
    try {
        const result = await axios.post(`api/Messages/create`, {
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
        const result = await axios.get(`api/Servers`);
        return result.data;
    } catch (e) {
        console.log("Error from getServers");
        console.log(e);
    }
}

async function getServerByServerId(serverId) {
    try {
        const result = await axios.get(`api/Servers/server?serverId=${serverId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getServerByServerId");
        console.log(e);
    }
}

async function getServerChannels(serverId) {
    try {
        const result = await axios.get(`api/Channels?serverId=${serverId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getServerChannels");
        console.log(e);
    }
}

async function getChannelByChannelId(channelId) {
    try {
        const result = await axios.get(`api/Channels/channel?channelId=${channelId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getChannelByChannelId");
        console.log(e);
    }
}

async function getChannelMessages(channelId) {
    try {
        const result = await axios.get(`api/Messages?channelId=${channelId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getChannelMessages");
        console.log(e);
    }
}

async function addChannelToServer(channelName, serverId) {
    try {
        const result = await axios.post(`api/Channels/create?channelName=${channelName}&serverId=${serverId}`);
        return result.data;
    } catch (e) {
        console.log("Error from addChannelToServer");
        console.log(e);
    }
}

async function deleteChannelFromServer(channelId) {
    try {
        // remove all messages from database with corresponding channelId
        const result = await axios.delete(`api/Messages/deleteByChannelId?channelId=${channelId}`);
        if (result) {
            // remove channel from database
            const result2 = await axios.delete(`api/Channels/delete?channelId=${channelId}`);
            return result2;
        }

        return false;
    } catch (e) {
        console.log("Error from deleteChannelFromServer");
        console.log(e);
    }
}

async function deleteServer(serverId) {
    try {
        // delete all channels from server first, then delete the entire server
        const channels = await getServerChannels(serverId);
        const channelIds = channels.map(channel => channel.channelId);

        const promiseArr = channelIds.map(channelId => deleteChannelFromServer(channelId));

        await Promise.all(promiseArr);

        await axios.delete(`api/Servers/delete?serverId=${serverId}`);
    } catch (e) {
        console.log("Error from deleteServer");
        console.log(e);
    }
}

// creates a new server in the database
async function addNewServer(serverName) {
    try {
        const result = await axios.post(`api/Servers/create?serverName=${serverName}`);
        return result.data;
    } catch (e) {
        console.log("Error from addNewServer");
        console.log(e);
    }
}

async function editServerName(serverId, serverName) {
    try {
        await axios.post(`api/Servers/editServerName?serverId=${serverId}&newName=${serverName}`);
    } catch (e) {
        console.log("Error from editServerName");
        console.log(e);
    }
}

async function checkUserNameTaken(userName) {
    try {
        const result = await axios.get(`api/Users/userExists?userName=${userName}`);
        return result.data;
    } catch (e) {
        console.log("Error from checkUsernameNotTaken");
        console.log(e);
    }
}

async function addUser(userName, password) {
    try {
        await axios.post(`api/Users/addUser?userName=${userName}&password=${password}`);
    } catch (e) {
        console.log("Error from addUser");
        console.log(e);
    }
}

async function verifyUser(userName, password) {
    try {
        const result = await axios.get(`api/Users/verifyUser?userName=${userName}&password=${password}`);
        return result.data;
    } catch (e) {
        console.log("Error from verifyUser");
        console.log(e);
    }
}

async function getUser(userId) {
    try {
        const result = await axios.get(`api/Users/userByUserId?userId=${userId}`);
        return result.data;
    } catch (e) {
        console.log("Error from getUser");
        console.log(e);
    }
}

async function getUserByUserName(userName) {
    try {
        const result = await axios.get(`api/Users/userByUserName?userName=${userName}`);
        return result.data;
    } catch (e) {
        console.log("Error from getUserByUserName");
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
exports.deleteServer = deleteServer;
exports.checkUserNameTaken = checkUserNameTaken;
exports.addUser = addUser;
exports.verifyUser = verifyUser;
exports.getUser = getUser;
exports.getUserByUserName = getUserByUserName;