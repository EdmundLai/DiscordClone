import React, { useEffect, useRef } from "react";

import Message from "../Message/Message";

import { differenceInMinutes } from "date-fns";

import "./ChatWindow.css";

var uniqid = require("uniqid");

// TODO: refactor to group messages from same person together within a certain time range
// try to match Discord existing functionality
function ChatWindow(props) {
    const messagesEndRef = useRef(null);

    function scrollToBottom() {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        //console.log("use effect in ChatWindow getting called!");

        scrollToBottom();

    }, [props.chatNeedsUpdate]);

    function groupChatMessages() {
        console.log(props.chat);

        const messageGroupArr = [];

        let messageGroup = null;

        // return true if messages should be grouped,
        // false if messages should not be grouped
        function groupMessagesTogether(message1, message2) {
            const timeDifference = differenceInMinutes(new Date(message1.creationTime), new Date(message2.creationTime));
            return (message1.userName === message2.userName) && (timeDifference < 20);
        }

        props.chat.forEach(message => {

            function initializeMessageGroup() {
                messageGroup = {
                    userName: message.userName,
                    firstMessage: message,
                    messages: [message],
                };
            }

            // messageGroup is only ever initially null
            if (messageGroup === null) {
                initializeMessageGroup();
            } else {
                const lastMessage = messageGroup.messages[messageGroup.messages.length - 1];
                if (groupMessagesTogether(lastMessage, message)) {
                    messageGroup.messages.push(message);
                } else {
                    messageGroupArr.push(messageGroup);
                    initializeMessageGroup();
                }
            }
        });

        // add the last messageGroup to the array
        messageGroupArr.push(messageGroup);

        console.log("Message Group Array:");
        console.log(messageGroupArr);
    }

    groupChatMessages();


    const messages = props.chat.map((m) => {
        return(
            <Message
                key={uniqid()}
                userName={m.userName}
                creationTime={m.creationTime}
                messageContent={m.messageContent}
            />
        );
    });

    //console.log(props.chat);

    return (
        <div className="ChatWindow">
            {messages}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatWindow;
