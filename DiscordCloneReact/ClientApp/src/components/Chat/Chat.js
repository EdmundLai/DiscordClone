import React, { useState, useEffect, useRef, useCallback } from 'react';

import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

import ChatWindow from '../ChatWindow/ChatWindow';
import ChatInput from '../ChatInput/ChatInput';

import "./Chat.css";

import requestController from '../../api/requestController';

function Chat(props) {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const [chatNeedsUpdate, setChatNeedsUpdate] = useState(false);

    const latestChats = useRef({});

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('/chathub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        console.log("setConnection from Chat called!");
    }, []);

    const getChannelMessagesFromDatabase = useCallback(async () => {
        const messageData = await requestController.getChannelMessages(
            props.channel.channelId
        );
        //console.log("getChannelMessagesFromDatabase");

        latestChats.current[String(props.channel.channelId)] = messageData;
        setChatNeedsUpdate(true);
    }, [props.channel]);

    useEffect(() => {
        //console.log(chatNeedsUpdate);
        //console.log(props.channel);

        const getData = async () => {
            const messageData = await requestController.getChannelMessages(
                props.channel.channelId
            );
            //console.log("getChannelMessagesFromDatabase");

            latestChats.current[String(props.channel.channelId)] = messageData;
        }

        getData().then(() => {
            if (String(props.channel.channelId) in latestChats.current) {
                //console.log(`channelId found in latestChats.current`);
                //console.log(latestChats.current[String(props.channel.channelId)]);

                setChat(latestChats.current[String(props.channel.channelId)]);
            }
            setChatNeedsUpdate(false);
        });
        
    }, [chatNeedsUpdate, props.channel]);

    useEffect(() => {
        //console.log("second use effect called");
        let isMounted = true;

        let handleMessage = message => {
            console.log("handleMessage called!")
            console.log(message);

            const newChats = { ...latestChats.current };

            if (!(String(props.channel.channelId) in newChats)) {
                newChats[String(props.channel.channelId)] = [];
            }
            console.log(`channelId: ${String(props.channel.channelId)}`);
            console.log(`message channelId: ${message.channelId}`);
            console.log(message);

            newChats[String(message.channelId)].push(message);

            latestChats.current = newChats;

            const updatedChat = newChats[String(message.channelId)];

            setChat(updatedChat);
            setChatNeedsUpdate(true);
        }

        async function initClientConnection(connection) {
            console.log("Connected!");
            
            connection.invoke("AddToGroup", String(props.channel.channelId))
                .catch(err => console.log(err));
            console.log(`connection added to group ${String(props.channel.channelId)}!`);

            //console.log(handleMessage);
            connection.on("ReceiveMessage", handleMessage);
            console.log("handleMessage handler assigned!");
        }

        // if connection is not null
        if (connection) {
            //console.log(connection.state);
            //console.log(HubConnectionState);
            if (connection.state === HubConnectionState.Disconnected) {
                console.log("hub is disconnected");
                connection.start()
                    .then(result => {
                        if (isMounted) {
                            getChannelMessagesFromDatabase();
                            initClientConnection(connection);
                        }
                    })
                    .catch(error => {
                        console.log(`Connection failed: ${error}`);
                    });
            } else if (connection.state === HubConnectionState.Connected) {
                console.log("hub is connected");
                if (isMounted) {
                    getChannelMessagesFromDatabase();
                    initClientConnection(connection);
                }
            }
        }

        return () => {
            console.log("channel is changing!");

            // release message handler, and remove from current group when unmounting
            if (connection) {
                console.log("handleMessage released!")
                connection.off("ReceiveMessage", handleMessage);
                console.log("removed from group!");
                connection.invoke("RemoveFromGroup", String(props.channel.channelId))
                    .catch(err => console.log(err));
            }
            setChat([]);
            //console.log("is chat getting set to empty here?")
            isMounted = false;
        }


    }, [connection,
        getChannelMessagesFromDatabase,
        props.channel]);

    async function sendMessage(username, message) {
        const channelId = String(props.channel.channelId);

        //console.log(channelId);

        const chatMessage = {
            userName: username,
            messageContent: message,
            channelId: channelId
        };

        if (connection.connectionStarted) {
            try {
                // save message to database here
                const userId = props.user.userId;

                await requestController.sendMessage(userId, channelId, message);

                // send message to signalR group
                // console.log(`channelId: ${channelId}`);
                await connection.send("SendMessageToGroup", channelId, chatMessage);

                setChatNeedsUpdate(true);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("No connection to server yet.");
        }
    }
    //console.log(props.channel);

    const chatContent = props.channel !== null ? <>
        <h2 className="ChatHeader"># {props.channel.channelName}</h2>
        <ChatWindow
            chat={chat}
            chatNeedsUpdate={chatNeedsUpdate}
        />
        <ChatInput
            channelName={props.channel.channelName}
            user={props.user}
            sendMessage={sendMessage}
        />
    </> : <></>;

    return (
        <div className="Chat">
            {chatContent}
        </div>
    );
}

export default Chat;