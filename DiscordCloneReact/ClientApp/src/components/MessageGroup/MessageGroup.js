import React from 'react';

import { formatToLocaleString } from '../../utils/DateUtil';

import "./MessageGroup.css";

var uniqid = require("uniqid");

function MessageGroup(props) {

    let messageGroupContent = <></>;

    if (props.group !== null) {
        const dateString = formatToLocaleString(props.group.firstMessage.creationTime);

        messageGroupContent = <>
            <div><strong>{props.group.userName}</strong> <span className="MessageGroupDate">{dateString}</span></div>
            {props.group.messages.map(message => {
                return (
                    <div key={uniqid()}>{message.messageContent}</div>
                );
            })}
        </>;
    }

    return (
        <div className="MessageGroup">
            {messageGroupContent}
        </div>
    );
}

export default MessageGroup;