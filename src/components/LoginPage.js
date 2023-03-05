import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../firebase/index';
import Main from './Main';

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
      <Main handle={handleSignInWithGoogle} />
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;