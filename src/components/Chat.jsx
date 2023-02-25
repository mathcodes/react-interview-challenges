import React, { useState, useEffect, useContext } from 'react';
import { database } from '../firebase/firebase';
import { FirebaseContext } from '../index';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const firebase = useContext(FirebaseContext);

  // Get messages from Firebase Realtime Database on component mount
  useEffect(() => {
    const messagesRef = database.ref('messages');
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

  // Function to handle sending new message to Firebase Realtime Database
  const handleSendMessage = (event) => {
    event.preventDefault();
    const messagesRef = database.ref('messages');
    messagesRef.push({ text: newMessage, userId: firebase.auth().currentUser.uid, timestamp: Date.now() });
    setNewMessage('');
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.text} - {message.userId}
        </div>
      ))}
      <form onSubmit={handleSendMessage}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
