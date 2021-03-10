import React from "react";

function Message(props) {
    return (
        <div
            style={{
                background: "#eee",
                borderRadius: "5px",
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
