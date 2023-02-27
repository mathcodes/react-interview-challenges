import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../index';

function LoginPage() {
  const [error, setError] = useState(null);
  const firebaseInstance = useContext(FirebaseContext);

  const handleSignInWithGoogle = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    try {
      await firebaseInstance.auth().signInWithPopup(provider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
export default function Main() {
  return (
<div class="text-white container">

    <h1 class="text-4xl font-bold text-white text-center pt-10">Welcome to the  </h1>
      <h3 class=" text-4xl font-bold text-white text-center pt-10">
        <span className="text-white hover:text-orange-500">
          R</span>
        <span className="text-white hover:text-red-500">
          e</span>
        <span className="text-white hover:text-teal-500">
          c</span>
        <span className="text-white hover:text-green-500">
          i</span>
        <span className="text-white hover:text-yellow-500">
          p</span>
        <span className="text-white hover:text-green-700">
          e</span>
        <span className="text-white hover:text-blue-700">
        </span>
        <span className="text-white hover:text-purple-300">
          G</span>
        <span className="text-white hover:text-pink-700">
          r</span>
          <span className="text-white hover:text-teal-500">
          a</span>
        <span className="text-white hover:text-orange-500">
          b</span>
          <span className="text-white hover:text-green-500">
          b</span>
        <span className="text-white hover:text-orange-500">
          e</span>
        <span className="text-white hover:text-orange-500">
          r</span></h3>
    <div class="flex flex-row justify-center">
      <p>
      This app utilizes Tailwind CSS, React, Firebase, and some 3rd-party APIs to create a recipe search engine. Users can search for recipes by ingredient, and save recipes to their
      </p>
   </div>
  </div>
  )
}

      <h1>Login</h1>
      <h1>Please sign in to continue.</h1>
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;
