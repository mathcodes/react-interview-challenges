import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../index';
import { database } from '../firebase/firebase';
import Header from './Header';

function UserProfile() {
  const { messages, savedMessages, handleDeleteMessage, handleSaveMessage } = useContext(FirebaseContext);
  const firebaseInstance = useContext(FirebaseContext);
  const [userProfile, setUserProfile] = useState({ name: '', id: '', credentials: null, savedMessages: [], savedRecipes: [] });

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
        savedRecipes: [],
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

      const savedRecipesRef = database.ref(`savedRecipes/${currentUser.uid}`);
      savedRecipesRef.on('value', (snapshot) => {
        const savedRecipesData = snapshot.val();
        if (savedRecipesData) {
          const savedRecipes = Object.entries(savedRecipesData).map(([key, value]) => {
            return { id: key, ...value };
          });
          setUserProfile((prevUserProfile) => ({
            ...prevUserProfile,
            savedRecipes: savedRecipes,
          }));
        }
      }
      );

    }
  }, [firebaseInstance]);

  const handleDeleteRecipe = (recipeId) => {
    const recipeRef = database.ref(`savedRecipes/${userProfile.id}/${recipeId}`);
    recipeRef.remove();
  };

  const handleSaveRecipe = (recipeId) => {
    const recipe = messages.find((recipe) => recipe.id === recipeId);
    const savedRecipesRef = database.ref(`savedRecipes/${userProfile.id}`);
    const newSavedRecipeRef = savedRecipesRef.push();
    newSavedRecipeRef.set({ text: recipe.text, userId: recipe.userId, timestamp: recipe.timestamp });
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      savedRecipes: [...prevUserProfile.savedRecipes, { id: newSavedRecipeRef.key, ...recipe }],
    }));
  };





  return (
    <div className="text-white UserProfile bg-zinc-800">
      <div
      className="flex flex-col justify-center p-4 rounded-md bg-zinc-800"
      >
        <div className="flex flex-row justify-between p-4 rounded-md bg-zinc-500">

        <h1>User Profile</h1>
        <p>Name: {userProfile.name}</p>
        <p>ID: {shortenUserId(userProfile.id)}</p>
      </div>
      </div>
      <div className="flex flex-row justify-between p-4 rounded-md bg-zinc-800">
        <div className="flex justify-between w-1/2 p-4 rounded-md bg-zinc-800">
          <ul>
            {userProfile.savedMessages.map((message) => (
              <>
                <li key={message.id} className="p-4 p-6 m-2 bg-green-900 rounded-md">
                  <p className="text-xl font-bold">{message.text}</p>
                  <p
                  className="text-xs "
                  >User ID: {shortenUserId(message.userId)}</p>
                </li>
                <p className="pl-5 text-xs"
                >{new Date(message.timestamp).toLocaleString()}</p>
              </>
            ))}
          </ul>
        </div>
        <div className="flex justify-between w-1/2 p-4 rounded-md bg-zinc-800">
          <ul>
            {userProfile.savedRecipes.map((recipe) => (
              <>
                <li key={recipe.id} className="p-4 p-6 m-2 rounded-md bg-zinc-800">
                  <p className="text-xl font-bold">{recipe.title}</p>
                  <p>Recipe ID: {(recipe.recipeId)}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <button onClick={() => handleSaveRecipe(recipe)}>Save</button>
                  <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
                </li>
                <p>{new Date(recipe.timestamp).toLocaleString()}</p>
              </>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default UserProfile;
