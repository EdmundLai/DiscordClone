import React from "react";

import Message from "../Message/Message";

import "./ChatWindow.css";

var uniqid = require("uniqid");


function ChatWindow(props) {
    const chat = props.chat;

    const messages = chat.map((m) => (
        <Message key={uniqid()} user={m.user} message={m.message} />
    ));

    return (
        <div className="ChatWindow">
            {messages}
        </div>
    );
}

export default ChatWindow;
