import React, { useState } from "react";

function ChatInput(props) {
  const [user, setUser] = useState("");

  const [message, setMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const isUserProvided = user && user !== "";

    const isMessageProvided = message && message !== "";

    if (isUserProvided && isMessageProvided) {
      props.sendMessage(user, message);
    } else {
      alert("Please insert a user and a message.");
    }
  }

  function onUserUpdate(e) {
    setUser(e.target.value);
  }

  function onMessageUpdate(e) {
    setMessage(e.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="user">User:</label>
      <br />
      <input
        type="text"
        id="user"
        name="user"
        value={user}
        onChange={onUserUpdate}
      />
      <br />
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
  );
}

export default ChatInput;
