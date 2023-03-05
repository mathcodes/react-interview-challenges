import React, { createContext, useState, useEffect } from 'react';
import {firebase} from './firebase';
import 'firebase/auth';
import 'firebase/database';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [savedMessages, setSavedMessages] = useState([]);
  const favoriteRecipes = [];
  useEffect(() => {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messages = Object.entries(messagesData).map(([key, value]) => {
          return { id: key, ...value };
        });
        setMessages(messages);
      }
    });
  }, []);

  useEffect(() => {
    if (firebase.auth().currentUser) {
      const savedMessagesRef = firebase.database().ref(`savedMessages/${firebase.auth().currentUser.uid}`);
      savedMessagesRef.on('value', (snapshot) => {
        const savedMessagesData = snapshot.val();
        if (savedMessagesData) {
          const savedMessages = Object.entries(savedMessagesData).map(([key, value]) => {
            return { id: key, ...value };
          });
          setSavedMessages(savedMessages);
        }
      });
    }
  }, []);

  const handleDeleteMessage = (messageId) => {
    const messageRef = firebase.database().ref(`messages/${messageId}`);
    messageRef.remove();
  };

  const handleSaveMessage = (messageId) => {
    const message = messages.find((message) => message.id === messageId);
    const savedMessagesRef = firebase.database().ref(`savedMessages/${firebase.auth().currentUser.uid}`);
    const newSavedMessageRef = savedMessagesRef.push();
    newSavedMessageRef.set({ text: message.text, userId: message.userId, timestamp: message.timestamp });
    setSavedMessages((prevSavedMessages) => [...prevSavedMessages, { id: newSavedMessageRef.key, ...message }]);
  };

  const contextValue = {
    messages,
    savedMessages,
    handleDeleteMessage,
    handleSaveMessage,
    setMessages,
    setSavedMessages,
  };

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;