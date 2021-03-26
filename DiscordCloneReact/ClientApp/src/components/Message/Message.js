import React from "react";

import { format, addMinutes } from 'date-fns';

import "./Message.css";


function Message(props) {
    const creationDate = new Date(props.creationTime);

    const offset = new Date().getTimezoneOffset();

    const localeDate = addMinutes(creationDate, offset * -1);

    const dateString = format(localeDate, "MM/dd/yyyy");

    return (
        <div className="Message">
            <p><strong>{props.userName}</strong> <span className="MessageDate">{dateString}</span></p>
            <p>{props.messageContent}</p>
        </div>
    );
}

export default Message;
