import React, { useState, useEffect, useContext } from 'react';
import { firebase } from '../firebase/firebase';
import { database } from '../firebase/firebase';

// import save icon
import { FaSave } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header';
// import './Chat.css';

function Chat() {
  // const firebase = useContext(FirebaseContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // the useEffect below is a listener that will listen for changes in the database. Notice the empty dependency array at the end of the useEffect. This is a dependency array that will make sure that the useEffect will run only once when the component is mounted.
  useEffect(() => {
    console.log('useEffect');
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

  useEffect(() => { // this useEffect is a listener that will listen for changes in the database every time the user logs in, and specifically for the saved messages of the user. Notice [firebase] at the end of the useEffect. This is a dependency array that will make sure that the useEffect will run every time the firebase changes.
    console.log('useEffect');
    if (firebase.auth().currentUser) {
      const savedMessagesRef = database.ref(`savedMessages/${firebase.auth().currentUser.uid}`);
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
  }, [firebase]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messagesRef = database.ref('messages');
    messagesRef.push({ text: newMessage, userId: firebase.auth().currentUser.uid, timestamp: Date.now() });
    setNewMessage('');
  };

  const handleDeleteMessage = (messageId) => {
    const messageRef = database.ref(`messages/${messageId}`);
    messageRef.remove();
  };

  const handleSaveMessage = (messageId) => {
    const message = messages.find((message) => message.id === messageId);
    const savedMessagesRef = database.ref(`savedMessages/${firebase.auth().currentUser.uid}`);
    const newSavedMessageRef = savedMessagesRef.push();
    newSavedMessageRef.set({ text: message.text, userId: message.userId, timestamp: message.timestamp });
    setSavedMessages((prevSavedMessages) => [...prevSavedMessages, { id: newSavedMessageRef.key, ...message }]);
  };

  const handleGetTemp = async (e) => {
    let apiKey = '31b40bbc1dd3415db1783017232602';
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);
      const temp = data.current.temp_f;
      console.log(temp);
      setNewMessage(temp);
      // handleSendMessage(newMessage);
    } catch (error) {
      console.error('Error fetching temp:', error);
    }
  };




  const currentUserMessages = messages.filter((message) => message.userId === firebase.auth().currentUser);
  const incomingMessages = messages.filter((message) => message.userId !== firebase.auth().currentUser);
  const sortedMessages = messages.sort((a, b) => b.timestamp - a.timestamp);




  // const shortenUserId = (userId) => {
  //   return userId.slice(0, 5);
  // };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="my-4 text-3xl text-white">Chat</div>


      <div className="grid w-4/6 grid-cols-1 p-2 overflow-y-scroll border-2 rounded-lg border-zinc-200 h-96 bg-zinc-900">
        <div className="flex flex-col-reverse mx-6">
          {sortedMessages.map((message) => {
            return (

              <div>

                <div className="flex flex-col">
                  <div key={message.id} className="relative p-2 ">
                    <div
                      className={
                        message.userId === firebase.auth().currentUser
                          ?
                          'flex absolute top-0 right-0 p-2 mb-2 text-white bg-green-600 border border-black rounded-lg '
                          :
                          'flex absolute top-0 left-0 p-2 mb-2 text-white bg-zinc-700 border border-black rounded-lg '
                      }
                    >
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
                      className="m-2 inline-block rounded text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <FaTrash
                        className="justify-center w-3 h-2 text-red-400 transition duration-150 ease-in-out transform hover:scale-150"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <form
        onSubmit={handleSendMessage} className="w-2/3 message-form">
        <input
          className="w-9/12 p-3 bg-zinc-100 "
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button
            className="w-3/12 p-3 text-sky-500 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-sky-500"

          type="submit">Send</button>
      </form>


    </div>

  );
}

export default Chat;