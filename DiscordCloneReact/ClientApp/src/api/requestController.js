var axios = require("axios");

const apiEndpoint = "https://localhost:5001";

// TODO: implement create server and create channel methods

async function sendMessage(userId, channelId, messageContent) {
    try {
        const result = await axios.post(`${apiEndpoint}/api/Messages/Create`, {
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
    } catch(e) {
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

exports.sendMessage = sendMessage;

exports.getServers = getServers;

exports.getServerChannels = getServerChannels;

exports.getChannelMessages = getChannelMessages;

exports.getServerByServerId = getServerByServerId;

exports.getChannelByChannelId = getChannelByChannelId;

exports.addChannelToServer = addChannelToServer;