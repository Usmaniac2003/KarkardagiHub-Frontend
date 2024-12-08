import React from 'react';
import { useChat } from '../../context/ChatContext';

const ChatList = ({ users }) => {
  const { getConversation, activeConversation } = useChat();

  return (
    <div className="chat-list">
      <h2>Conversations</h2>
      {users.map(user => (
        <div 
          key={user._id} 
          className={`chat-item ${activeConversation === user._id ? 'active' : ''}`}
          onClick={() => getConversation(user._id)}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default ChatList;

