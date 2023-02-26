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
      <h1>Please sign in to continue.</h1>
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;
