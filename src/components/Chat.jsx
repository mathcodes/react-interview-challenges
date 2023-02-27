import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../index';
import { database } from '../firebase/firebase';
// import save icon
import { FaSave } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header';
// import './Chat.css';

function Chat({ handleLogout, handleSignIn }) {
  const firebaseInstance = useContext(FirebaseContext);
  console.log('firebaseInstance', firebaseInstance);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState([]);

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

  useEffect(() => {
    if (firebaseInstance.auth().currentUser) {
      const savedMessagesRef = database.ref(`savedMessages/${firebaseInstance.auth().currentUser.uid}`);
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
  }, [firebaseInstance]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messagesRef = database.ref('messages');
    messagesRef.push({ text: newMessage, userId: firebaseInstance.auth().currentUser.uid, timestamp: Date.now() });
    setNewMessage('');
  };

  const handleDeleteMessage = (messageId) => {
    const messageRef = database.ref(`messages/${messageId}`);
    messageRef.remove();
  };

  // handleSaveMessage is  a function that saves a message to the database. Notice that we are using the same database.ref() method as we did in the useEffect() hook. This is because we are using the same database, but we are using a different path. The path we are using is savedMessages/${firebaseInstance.auth().currentUser.uid}. This path is a reference to the savedMessages node in the database. The ${firebaseInstance.auth().currentUser.uid} part of the path is a reference to the current user's id. This means that each user will have their own savedMessages node in the database. This is how we can save messages for each user. We are using the push() method to create a new message in the savedMessages node. We are then using the set() method to set the text, userId, and timestamp properties of the message. We are also using the setSavedMessages() hook to update the savedMessages state variable. This will cause the component to re-render and display the new saved message.
  const handleSaveMessage = (messageId) => {
    const message = messages.find((message) => message.id === messageId);
    const savedMessagesRef = database.ref(`savedMessages/${firebaseInstance.auth().currentUser.uid}`);
    const newSavedMessageRef = savedMessagesRef.push();
    newSavedMessageRef.set({ text: message.text, userId: message.userId, timestamp: message.timestamp });
    setSavedMessages((prevSavedMessages) => [...prevSavedMessages, { id: newSavedMessageRef.key, ...message }]);
  };



  const currentUserMessages = messages.filter((message) => message.userId === firebaseInstance.auth().currentUser.uid);
  const incomingMessages = messages.filter((message) => message.userId !== firebaseInstance.auth().currentUser.uid);

  // const shortenUserId = (userId) => {
  //   return userId.slice(0, 5);
  // };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl">Chat</div>
      <div className="box-border grid grid-cols-2 p-2 overflow-y-scroll border-2 border-black rounded-lg h-96 bg-sky-300">
        <div className="flex flex-col-reverse mx-6">
          {incomingMessages.map((message) => (
            <div key={message.id} className="self-start p-2 mb-2 bg-white border border-black rounded-lg">
              <p>{message.text}</p>
              {/* <p>From: {shortenUserId(message.userId)}</p> */}
              <p>Timestamp: {new Date(message.timestamp).toLocaleString()}</p>
              <button
                className="m-2 inline-block rounded bg-yellow-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                onClick={() => handleSaveMessage(message.id)}>Save</button>
              <button
                className="m-2 inline-block rounded bg-red-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                onClick={() => handleDeleteMessage(message.id)}>Delete</button>
            </div>
          ))}
        </div>
        <div className="flex flex-col-reverse mx-6">
          {currentUserMessages.map((message) => (
            <div>
            <div className="flex flex-col">
              <div key={message.id} className="p-2 mb-2 text-white bg-green-600 border border-black rounded-lg ">
                <div className="items-center justify-between ">
                  <p>{message.text}</p>
                </div>
              </div>
              <div
               className="flex flex-row self-end p-2 mb-2 text-white ">
<p className="text-xs">{new Date(message.timestamp).toLocaleString()}</p>
                <button
                  className="m-2 inline-block rounded p-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  onClick={() => handleSaveMessage(message.id)}
                >
                  <FaSave
                    className="justify-center w-3 h-2 text-yellow-400 transition duration-150 ease-in-out transform hover:scale-150"
                  />
                </button>
                <button
                  className="m-2 inline-block rounded text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  <FaTrash
                    className="justify-center w-3 h-2 text-red-400 transition duration-150 ease-in-out transform hover:scale-150"
                  />
                </button>
              </div>

            </div>

            </div>
          ))}

        </div>
      </div>
      <form
        onSubmit={handleSendMessage} className="message-form">
        <input className="m-2 bg-gray-300" type="text" value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>

  );
}

export default Chat;