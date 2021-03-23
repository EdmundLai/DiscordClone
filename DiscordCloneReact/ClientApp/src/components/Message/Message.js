import React from "react";

function Message(props) {
    return (
        <div
            style={{
                padding: "0 10px",
            }}
        >
            <p>
                <strong>{props.user}</strong> says:
      </p>
            <p>{props.message}</p>
        </div>
    );
}

export default Message;
