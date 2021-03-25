import React from "react";

import "./Message.css";

function Message(props) {
    return (
        <div className="Message">
            <p><strong>{props.userName}</strong> says:</p>
            <p>{props.messageContent}</p>
        </div>
    );
}

export default Message;
