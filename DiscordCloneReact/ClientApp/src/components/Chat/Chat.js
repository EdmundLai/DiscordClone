import React, { useState, useEffect, useRef } from 'react';

import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

import ChatWindow from '../ChatWindow/ChatWindow';
import ChatInput from '../ChatInput/ChatInput';

function Chat(props) {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);

    const [initialized, setInitialized] = useState(false);

    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        console.log("channel is changing!");
        setChat([]);
        setInitialized(false);
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/chathub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        console.log("setConnection called!");
    }, [props.channel]);

    useEffect(() => {
        let isMounted = true;
        
        // if connection is not null
        if (connection) {
            //console.log(connection.state);
            //console.log(HubConnectionState);
            if (!initialized) {
                if (connection.state === HubConnectionState.Disconnected) {
                    connection.start()
                        .then(result => {
                            if (isMounted) {
                                initClientConnection(connection);
                                setInitialized(true);
                            }
                            
                        })
                        .catch(error => {
                            console.log(`Connection failed: ${error}`);
                        });
                } else if (connection.state === HubConnectionState.Connected) {
                    if (isMounted) {
                        initClientConnection(connection);
                        setInitialized(true);
                    }
                    
                }
            }
            
        }

        function initClientConnection(connection) {
            console.log("Connected!");

            // needs to be changed to channelid or something unique to channel
            // channel name is not unique
            connection.invoke("AddToGroup", String(props.channel.channelId))
                .catch(err => console.log(err));

            connection.on("ReceiveMessage", message => {
                const updatedChat = [...latestChat.current];
                updatedChat.push(message);

                setChat(updatedChat);
            });
        }

        return () => {
            isMounted = false;
        }


    }, [connection, initialized, setInitialized, props.channel]);

    async function sendMessage(user, message) {
        const chatMessage = {
            user: user,
            message: message
        };

        if (connection.connectionStarted) {
            try {
                await connection.send("SendMessageToGroup", String(props.channel.channelId), chatMessage);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("No connection to server yet.");
        }
    }

    return (
        <div>
            <h1>{props.channel.channelName}</h1>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat} />
        </div>

        );
}

export default Chat;