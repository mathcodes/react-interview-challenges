import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../index';
import { database } from '../firebase/firebase';
import Header from './Header';

function UserProfile() {
  const { messages, savedMessages, handleDeleteMessage, handleSaveMessage } = useContext(FirebaseContext);
  const firebaseInstance = useContext(FirebaseContext);
  const [userProfile, setUserProfile] = useState({ name: '', id: '', credentials: null, savedMessages: [] });

  // Function that changes the user ids into the first five characters of the user id
  const shortenUserId = (userId) => {
    return userId.slice(0, 5);
  };

  useEffect(() => {
    if (firebaseInstance.auth().currentUser) {
      const currentUser = firebaseInstance.auth().currentUser;
      const userProfile = {
        name: currentUser.displayName,
        id: currentUser.uid,
        credentials: currentUser.providerData,
        savedMessages: [],
      };
      setUserProfile(userProfile);

      const savedMessagesRef = database.ref(`savedMessages/${currentUser.uid}`);
      savedMessagesRef.on('value', (snapshot) => {
        const savedMessagesData = snapshot.val();
        if (savedMessagesData) {
          const savedMessages = Object.entries(savedMessagesData).map(([key, value]) => {
            return { id: key, ...value };
          });
          setUserProfile((prevUserProfile) => ({
            ...prevUserProfile,
            savedMessages: savedMessages,
          }));
        }
      });
    }
  }, [firebaseInstance]);

  return (
    <div className="text-white UserProfile bg-sky-600">
            <div className="flex justify-between p-4 bg-sky-500">
      <h1>User Profile</h1>
      <p>Name: {userProfile.name}</p>
      <p>ID: {shortenUserId(userProfile.id)}</p>
      </div>
      <div className="flex justify-between w-1/2 p-4 rounded-md bg-sky-500">
      <ul>
        {userProfile.savedMessages.map((message) => (
          <>
          <li key={message.id} className="p-4 p-6 m-2 rounded-md bg-sky-400">
            <p className="text-xl font-bold">{message.text}</p>
            <p>User ID: {shortenUserId(message.userId)}</p>
          </li>
           <p>{new Date(message.timestamp).toLocaleString()}</p>
          </>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default UserProfile;
