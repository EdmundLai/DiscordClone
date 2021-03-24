import React, { useState, useEffect, useRef, useCallback } from 'react';

import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

import ChatWindow from '../ChatWindow/ChatWindow';
import ChatInput from '../ChatInput/ChatInput';

import "./Chat.css";

function Chat(props) {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const channelConnections = useRef({});
    const [chatNeedsUpdate, setChatNeedsUpdate] = useState(false);

    const latestChats = useRef({});

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/chathub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        console.log("setConnection called!");
    }, []);

    // returns true if channelConnections contains connectionId
    // uses username as key for connection dictionary
    const configureChannelConnections = useCallback(async () => {
        const newChannelConnections = { ...channelConnections.current };

        const username = props.user.userName;
        console.log(username);

        //const channelId = String(props.channel.channelId);

        const connectionId = await connection.invoke("GetConnectionId");

        console.log(`connectionId: ${connectionId}`);
        if (!(username in newChannelConnections)) {
            newChannelConnections[username] = new Set();
        }

        let hasConnectionId = true;

        if (!newChannelConnections[username].has(connectionId)) {
            newChannelConnections[username].add(connectionId);
            hasConnectionId = false;
        }

        console.log(channelConnections.current);

        channelConnections.current = newChannelConnections;

        return hasConnectionId;

    }, [props.user.userName, connection])

    useEffect(() => {
        if (String(props.channel.channelId) in latestChats.current) {
            //console.log(latestChats.current[String(props.channel.channelId)]);
            setChat(latestChats.current[String(props.channel.channelId)]);
        }

        setChatNeedsUpdate(false);
    }, [chatNeedsUpdate, setChatNeedsUpdate, props.channel.channelId])

    useEffect(() => {
        console.log("second use effect called");
        let isMounted = true;
        
        
        // if connection is not null
        if (connection) {
            //console.log(connection.state);
            //console.log(HubConnectionState);
            if (connection.state === HubConnectionState.Disconnected) {
                console.log("hub is disconnected");
                connection.start()
                    .then(result => {
                        if (isMounted) {
                            initClientConnection(connection);
                        }
                    })
                    .catch(error => {
                        console.log(`Connection failed: ${error}`);
                    });
            } else if (connection.state === HubConnectionState.Connected) {
                console.log("hub is connected");
                if (isMounted) {
                    
                    initClientConnection(connection);
                }
            }
        }

        let handleMessage = message => {
            const currChannelId = String(props.channel.channelId);

            const newChats = { ...latestChats.current };

            if (!(currChannelId in newChats)) {
                newChats[currChannelId] = [];
            }
            console.log(`channelId: ${currChannelId}`);
            console.log(`message channelId: ${message.channelId}`);
            console.log(message);
            if (currChannelId === message.channelId) {
                console.log("channel id and message channel id are the same!");
                newChats[currChannelId].push(message);

                latestChats.current = newChats;

                const updatedChat = newChats[currChannelId];

                console.log(updatedChat);

                setChat(updatedChat);
                setChatNeedsUpdate(true);
            }
        }

        async function initClientConnection(connection) {
            console.log("Connected!");

            const hasConnectionId = await configureChannelConnections();

            if (!hasConnectionId) {
                connection.invoke("AddToGroup", String(props.channel.channelId))
                    .catch(err => console.log(err));
            }
            connection.on("ReceiveMessage", handleMessage);
        }

        return () => {
            console.log("channel is changing!");

            // release message handler when unmounting
            if (connection) {
                connection.off("ReceiveMessage", handleMessage);
            }
            setChat([]);
            //console.log("is chat getting set to empty here?")
            isMounted = false;
        }


    }, [connection, configureChannelConnections, props.channel.channelId]);

    async function sendMessage(user, message) {
        const channelId = String(props.channel.channelId);

        const chatMessage = {
            user: user,
            message: message,
            channelId: channelId
        };

        if (connection.connectionStarted) {
            try {
                await connection.send("SendMessageToGroup", channelId, chatMessage);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("No connection to server yet.");
        }
    }

    return (
        <div className="Chat">
            <h1 className="ChatHeader"># {props.channel.channelName}</h1>
            <ChatWindow chat={chat} />
            <ChatInput userName={props.user.userName} sendMessage={sendMessage} />
        </div>

    );
}

export default Chat;