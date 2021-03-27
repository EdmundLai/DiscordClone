import React, { useState } from "react";

import { Input } from "antd";

import "./ChatInput.css";

function ChatInput(props) {

    const [message, setMessage] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        const isMessageProvided = message && message !== "";

        if (isMessageProvided) {
            props.sendMessage(props.user.userName, message);
        } else {
            alert("Please insert a message.");
        }
        setMessage("");
    }

    function onMessageUpdate(e) {
        setMessage(e.target.value);
    }

    return (
        <form className="ChatInput" onSubmit={onSubmit}>
            <Input
                id="ChatInputBar"
                type="text"
                name="message"
                value={message}
                onChange={onMessageUpdate}
                placeholder={`Message #${props.channelName}`}
            />
            <br />
            <button className="ChatInputSubmit">Submit</button>
        </form>
    );
}

export default ChatInput;
