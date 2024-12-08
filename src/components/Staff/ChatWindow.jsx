import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';

const ChatWindow = () => {
  const { conversations, activeConversation, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversations[activeConversation]]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeConversation) {
      sendMessage(activeConversation, newMessage);
      setNewMessage('');
    }
  };

  if (!activeConversation) {
    return <div>Select a conversation to start chatting</div>;
  }

  return (
    <div className="chat-window">
      <div className="messages">
        {conversations[activeConversation]?.map(message => (
          <div key={message._id} className={`message ${message.sender === activeConversation ? 'received' : 'sent'}`}>
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;

