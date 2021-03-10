import React, { useState, useEffect } from "react";

import "./ChannelMessages.css";

var requestController = require("../../api/requestController");

function ChannelMessages(props) {
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

    return (
        <div className="ChannelMessages">
            <h3 className="ChannelHeading"># {channelName}</h3>
            {messages.map((m) => {
                return (
                    <div key={m.messageId}>
                        {m.userName} : {m.messageContent}
                    </div>
                );
            })}
        </div>
    );
}

export default ChannelMessages;
