import React, { useEffect, useRef } from "react";

import MessageGroup from "../MessageGroup/MessageGroup";

import { differenceInMinutes } from "date-fns";

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

    }, [props.chatNeedsUpdate]);

    // tested to work
    function groupChatMessages() {
        //console.log(props.chat);

        function sortChatMessages(messages) {
            return messages.sort((a, b) => new Date(a.creationTime) - new Date(b.creationTime));
        }

        // presort messages to ensure they are in chronological order
        const sortedMessages = sortChatMessages(props.chat);

        const messageGroupArr = [];

        let messageGroup = null;

        // return true if messages should be grouped,
        // false if messages should not be grouped
        function groupMessagesTogether(message1, message2) {
            try {
                const timeDifference = Math.abs(differenceInMinutes(new Date(message1.creationTime), new Date(message2.creationTime)));

                //console.log(timeDifference);
                return (message1.userName === message2.userName) && (timeDifference < 7);

            } catch (e) {
                console.log("error found in groupMessagesTogether")
                console.log(`error: ${e}`);

                return (message1.userName === message2.userName);
            }
            
        }

        sortedMessages.forEach(message => {

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

        //console.log("Message Group Array:");
        //console.log(messageGroupArr);

        return messageGroupArr;
    }

    const messageGroupArr = groupChatMessages();

    const messageGroupsContent = messageGroupArr.map(messageGroup =>
        <MessageGroup key={uniqid()} group={messageGroup} />);

    return (
        <div className="ChatWindow">
            {messageGroupsContent}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatWindow;
