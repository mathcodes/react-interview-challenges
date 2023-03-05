import React, { useState, useEffect, useContext } from 'react';
import { firebase } from '../firebase/firebase';
import { database } from '../firebase/firebase';
import { FirebaseContext } from '../firebase/index';
import Header from './Header';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegWindowClose } from 'react-icons/fa';


function UserProfile({ user, handleLogout, handleSignIn }) {
  console.log('user', user);
  console.log('handleLogout', handleLogout);
  console.log('handleSignIn', handleSignIn);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

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
  }
    , []);

  useEffect(() => {
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
  }
    , [firebase]);

  useEffect(() => {
    console.log('useEffect');
    if (firebase.auth().currentUser) {
      const savedRecipesRef = database.ref(`savedRecipes/${firebase.auth().currentUser.uid}`);
      savedRecipesRef.on('value', (snapshot) => {
        const savedRecipesData = snapshot.val();
        if (savedRecipesData) {
          const savedRecipes = Object.entries(savedRecipesData).map(([key, value]) => {
            return { id: key, ...value };
          });
          setSavedRecipes(savedRecipes);
        }
      });
    }
  }
    , [firebase]);

  const handleSaveMessage = (messageId) => {
    console.log('save message', messageId);
    const message = messages.find((message) => message.id === messageId);
    const savedMessage = {
      ...message,
      saved: true,
    };
    database.ref(`savedMessages/${firebase.auth().currentUser.uid}/${messageId}`).set(savedMessage);
  }

  const handleDeleteMessage = (messageId) => {
    console.log('delete message', messageId);
    database.ref(`savedMessages/${firebase.auth().currentUser.uid}/${messageId}`).remove();
  }

  const handleSaveRecipe = (recipeId) => {
    console.log('save recipe', recipeId);
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
    const savedRecipe = {
      ...recipe,
      saved: true,
    };
    database.ref(`savedRecipes/${firebase.auth().currentUser.uid}/${recipeId}`).set(savedRecipe);
  }

  const handleDeleteRecipe = (recipeId) => {
    console.log('delete recipe', recipeId);
    database.ref(`savedRecipes/${firebase.auth().currentUser.uid}/${recipeId}`).remove();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <div className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to your profile page, {user.displayName}!
        </h1>
        <div className="flex flex-row items-center justify-center flex-1 w-full px-20 text-center">
          <div className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
            <h1 className="text-4xl font-bold">
              Saved Messages
            </h1>
            <div className="flex items-center justify-center flex-1 w-full px-20 text-center rounded bg-zinc-800">
              <div className="flex flex-col items-center justify-between flex-1 w-full p-5 text-center rounded bg-zinc-700">
                {savedMessages.map((message) => (
                  <div className="flex items-center justify-between flex-1 w-full p-1 m-3 text-white rounded px-4text-center bg-zinc-500 ">
                    {message.text}

                    <button className="flex items-center justify-center pl-6 text-center " onClick={() => handleDeleteMessage(message.id)}>
                      <FaRegTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
            <h1 className="text-4xl font-bold">
              Saved Recipes
            </h1>
            <div className="flex flex-row items-center justify-center flex-1 w-full px-20 text-center">
              <div className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
                {savedRecipes.map((recipe) => (
                  <div className="flex flex-row items-center justify-center flex-1 w-full px-20 text-center">
                    {recipe.text}
                    <button className="flex flex-row items-center justify-center flex-1 w-full px-20 text-center" onClick={() => handleDeleteRecipe(recipe.id)}>
                      <FaRegTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

