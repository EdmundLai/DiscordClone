import React, { useEffect, useRef } from "react";

import Message from "../Message/Message";

import "./ChatWindow.css";

var uniqid = require("uniqid");


function ChatWindow(props) {
    const messagesEndRef = useRef(null);

    function scrollToBottom() {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        //console.log("use effect in ChatWindow getting called!");

        scrollToBottom();

        props.setChatWindowNeedsScroll(false);
    }, [props]);

    const messages = props.chat.map((m) => (
        <Message key={uniqid()} user={m.user} message={m.message} />
    ));

    return (
        <div className="ChatWindow">
            {messages}
            <div ref={messagesEndRef}/>
        </div>
    );
}

export default ChatWindow;
