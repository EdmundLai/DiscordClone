import React from 'react';

var requestController = require('../api/requestController');

function TestComponent() {
    function sendTestMessage() {
        requestController.sendMessage(1, 1, "hello world!");
    }

    async function getChannelOneMessages() {
        const messages = await requestController.getChannelMessages(1);
        console.log(messages);
    }

    async function getServers() {
        const servers = await requestController.getServers();
        console.log(servers);
    }

    async function getServerOneChannels() {
        const channels = await requestController.getServerChannels(1);
        console.log(channels);
    }

    return (
        <div>
            <button onClick={sendTestMessage}>Send Message</button>
            <button onClick={getChannelOneMessages}>Get Channel 1 Messages</button>
            <button onClick={getServers}>Get Server List</button>
            <button onClick={getServerOneChannels}>Get server 1 channels</button>
        </div>
    );
}

export default TestComponent;