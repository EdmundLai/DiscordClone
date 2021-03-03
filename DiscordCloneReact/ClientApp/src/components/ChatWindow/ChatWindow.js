import React from 'react';

import Message from '../Message/Message';

var uniqid = require('uniqid');

function ChatWindow(props) {
    const chat = props.chat;

    const messages = chat.map(m => 
        <Message
            key={uniqid()}
            user={m.user}
            message={m.message}
        />
    );

    return (
        <div>
            {messages}
        </div>

    );

}

export default ChatWindow;