import React, { useState, useEffect, useContext } from 'react';
import { firebase } from '../firebase/firebase';
import { database } from '../firebase/firebase';
import { FirebaseContext } from '../firebase/index';
import { FaHeart } from 'react-icons/fa';

import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import Header from './Header';
import { FaRegWindowClose } from 'react-icons/fa';


function UserProfile({ user, handleLogout, handleSignIn }) {
  const [userProfile, setUserProfile] = useState({
    name: '',
    id: '',
    credentials: null,
    savedMessages: [],
    savedRecipes: [],
  });

  console.log('user', user);
  console.log('handleLogout', handleLogout);
  console.log('handleSignIn', handleSignIn);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

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
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserProfile((prevUserProfile) => ({
          ...prevUserProfile,
          name: user.displayName,
          id: user.uid,
        }));
      } else {
        setUserProfile({
          name: '',
          id: '',
          credentials: null,
          savedMessages: [],
          savedRecipes: [],
        });
      }
    });

    return () => {
      authListener();
    };
  }, [firebase]);

  useEffect(() => {
    console.log('useEffect');

    if (firebase.auth().currentUser) {
      const savedRecipesRef = database.ref(`savedRecipes/${firebase.auth().currentUser.uid}`);
      savedRecipesRef.on('value', (snapshot) => {
        const savedRecipesData = snapshot.val();
        if (savedRecipesData) {
          console.log('savedRecipesData', savedRecipesData);
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
    // modofy the code so that the heart fills in   only for the corresponding recipe
    console.log('save recipe', recipeId);
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
    const savedRecipe = {
      ...recipe,
      saved: true,
    };
    database.ref(`savedRecipes/${firebase.auth().currentUser.uid}/${recipeId}`).set(savedRecipe);

  }
  // const handleFavoriteRecipe = (recipeId) => {
  //   console.log('recipes', recipes);
  //   console.log('recipeId', recipeId);
  //   const recipe = recipes.find((r) => r.id === recipeId);
  //   console.log('recipe', recipe);
  //   const favoriteRecipe = {
  //     recipeId: recipe.id,
  //     favorite: true,
  //   };
  //   console.log('favoriteRecipe', favoriteRecipe);
  //   database.ref(`savedRecipes/${firebase.auth().currentUser.uid}/${recipeId}`).set(favoriteRecipe);
  // }




  const handleDeleteRecipe = (recipeId) => {
    console.log('delete recipe', recipeId);

    // Remove the recipe with the specified recipeId from the savedRecipes array
    const updatedSavedRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId);
    setSavedRecipes(updatedSavedRecipes);

    // Remove the recipe from the Firebase Realtime Database
    database.ref(`savedRecipes/${firebase.auth().currentUser.uid}/${recipeId}`).remove();
  }


  return (
    <div className="container flex flex-col py-2 text-white">
      <h1 className="text-4xl font-bold">
        Welcome to your profile page, <span className="text-blue-500 hover:text-blue-700">{user.displayName}</span>
      </h1>
      <div className="flex flex-row items-start text-center">
        {/* SAVED MESSAGES */}
        <div className="flex flex-col items-center flex-1 text-center">
          <h1 className="my-10 text-2xl font-bold ">
            Saved Messages
          </h1>
          <div className="flex items-center justify-center flex-1 w-full px-20 text-center rounded bg-zinc-800">
            <div className="flex flex-col items-center justify-between flex-1 w-full p-5 text-center rounded bg-zinc-700">
              {savedMessages.map((message) => (
                <div className="flex items-center justify-between flex-1 w-full p-1 m-3 text-white rounded px-4text-center bg-zinc-500 ">
                  {message.text}
                  <button className="flex items-center justify-center text-2xl text-center text-red-400 hover:text-red-600" onClick={() => handleDeleteMessage(message.id)}>
                    <FaRegTrashAlt />
                  </button>

                </div>
              ))}
            </div>
          </div>
        </div>
        {/* SAVED RECIPES */}
        <div className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
          <h1 className="my-10 text-2xl font-bold ">
            Saved Recipes
          </h1>
          <div className="flex items-center justify-center flex-1 w-full px-20 text-center rounded bg-zinc-800">
            <div className="flex flex-col items-center justify-between flex-1 w-full p-5 text-center rounded bg-zinc-700">
              {savedRecipes.map((recipe) => (
                // make a div that create an image of the recipe as theh top part of a card:
                <div className="flex flex-col items-center justify-between flex-1 w-full p-5 text-center rounded bg-zinc-700">
                  <div className="flex items-center justify-between flex-1 w-full p-1 m-3 text-white rounded px-4text-center bg-zinc-500 ">
                    <div className="flex flex-col items-center justify-between flex-1 w-full p-5 text-center rounded bg-zinc-700">
                      <img src={recipe.image} alt={recipe.title} />
                      <h2>{recipe.title}</h2>
                      <p>{recipe.description}</p>
                      <div className="flex flex-row items-center justify-around flex-1 w-full p-5 text-center rounded bg-zinc-700">
                      <button className="flex items-center justify-center text-2xl text-center text-red-400 hover:text-red-600" onClick={() => handleDeleteRecipe(recipe.id)}>
                        <FaRegTrashAlt />
                      </button>
                      {/* <button className="flex items-center justify-center pl-6 text-center text-red-400 hover:text-red-600" onClick={() => handleFavoriteRecipe(recipe.id)}>
                        <FaRegHeart />
                      </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;