import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState({});
  const [activeConversation, setActiveConversation] = useState(null);

  const sendMessage = async (receiverId, content) => {
    try {
      const response = await axios.post('/api/messages/send', { receiverId, content });
      const newMessage = response.data.data;
      
      setConversations(prev => ({
        ...prev,
        [receiverId]: [...(prev[receiverId] || []), newMessage]
      }));

      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getConversation = async (userId) => {
    try {
      const response = await axios.get(`/api/messages/conversation/${userId}`);
      const messages = response.data.data;

      setConversations(prev => ({
        ...prev,
        [userId]: messages
      }));

      setActiveConversation(userId);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.put(`/api/messages/read/${messageId}`);
      // Update local state to mark message as read
      setConversations(prev => {
        const updatedConversations = { ...prev };
        Object.keys(updatedConversations).forEach(userId => {
          updatedConversations[userId] = updatedConversations[userId].map(msg => 
            msg._id === messageId ? { ...msg, read: true } : msg
          );
        });
        return updatedConversations;
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      sendMessage,
      getConversation,
      markAsRead,
      setActiveConversation
    }}>
      {children}
    </ChatContext.Provider>
  );
};

