import React, { useState } from "react";

import "./ChatInput.css";

function ChatInput(props) {

    const [message, setMessage] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        const isMessageProvided = message && message !== "";

        if (isMessageProvided) {
            props.sendMessage(props.userName, message);
        } else {
            alert("Please insert a message.");
        }
        props.setChatWindowNeedsScroll(true);
        setMessage("");
    }

    function onMessageUpdate(e) {
        setMessage(e.target.value);
    }

    return (
        <form className="ChatInput" onSubmit={onSubmit}>
            <input
                type="text"
                id="message"
                name="message"
                value={message}
                onChange={onMessageUpdate}
            />
            <br />
            <button className="ChatInputSubmit">Submit</button>
        </form>
    );
}

export default ChatInput;
