import React, { useState } from "react";

function ChatInput(props) {

    const [message, setMessage] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        const isMessageProvided = message && message !== "";

        if (isMessageProvided) {
            props.sendMessage(props.userName, message);
        } else {
            alert("Please insert a message.");
        }

        setMessage("");
    }

    function onMessageUpdate(e) {
        setMessage(e.target.value);
    }

    return (
        <div>
            <p>Username: {props.userName}</p>
            <form onSubmit={onSubmit}>
                <label htmlFor="message">Message:</label>
                <br />
                <input
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={onMessageUpdate}
                />
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default ChatInput;
