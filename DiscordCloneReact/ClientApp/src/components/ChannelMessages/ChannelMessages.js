import React from "react";

import Chat from '../Chat/Chat';

import "./ChannelMessages.css";

function ChannelMessages(props) {

    return (
        <div className="ChannelMessages">
            <Chat channel={props.channel} user={props.user} />
        </div>
    );
}

export default ChannelMessages;
