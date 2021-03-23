import React, { useState, useEffect } from "react";

import Chat from '../Chat/Chat';

import "./ChannelMessages.css";

var requestController = require("../../api/requestController");

function ChannelMessages(props) {
    const [chatOn, setChatOn] = useState(false);

    const [messages, setMessages] = useState([]);
    const [channelName, setChannelName] = useState("");

    useEffect(() => {
        const getChannelMessages = async () => {
            const messageData = await requestController.getChannelMessages(
                props.channel.channelId
            );

            setMessages(messageData);
        };

        getChannelMessages();
        setChannelName(props.channel.channelName);
    }, [props.channel]);

    function toggleChatOn() {
        setChatOn(!chatOn);
    }

    const chatToggleText = !chatOn ? "Chat Off" : "Chat On";

    const channelContent = !chatOn ? <div className="ChannelMessages">
        <h3 className="ChannelHeading"># {channelName}</h3>
        {messages.map((m) => {
            return (
                <div key={m.messageId}>
                    {m.userName} : {m.messageContent}
                </div>
            );
        })}
    </div> : <Chat channel={props.channel} />

    return (
        <div className="ChannelMessagesContainer">
            <div>Toggle Chat state:
                <button onClick={toggleChatOn}>{chatToggleText}</button>
            </div>
            {channelContent}
        </div>

    );
}

export default ChannelMessages;
