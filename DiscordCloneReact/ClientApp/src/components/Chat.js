import React, { useState, useEffect, useRef } from 'react';

import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow/ChatWindow';
import ChatInput from './ChatInput/ChatInput';

function Chat() {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);

    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/chathub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        // if connection is not null
        if (connection) {
            connection.start()
                .then(result => {
                    console.log("Connected!");

                    connection.on("ReceiveMessage", message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    })
                })
                .catch(error => {
                    console.log(`Connection failed: ${error}`);
                })

        }
    }, [connection]);

    async function sendMessage(user, message) {
        const chatMessage = {
            user: user,
            message: message
        };

        if (connection.connectionStarted) {
            try {
                await connection.send("SendMessage", chatMessage);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("No connection to server yet.");
        }
    }

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat} />
        </div>

        );
}

export default Chat;