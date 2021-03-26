import React from "react";

import { formatToLocaleString } from '../../utils/DateUtil';

import "./Message.css";


function Message(props) {
    const dateString = formatToLocaleString(props.creationTime);

    return (
        <div className="Message">
            <p><strong>{props.userName}</strong> <span className="MessageDate">{dateString}</span></p>
            <p>{props.messageContent}</p>
        </div>
    );
}

export default Message;
