import React, { useState, useContext } from 'react';
import { firebase } from './firebase/firebase';
import { FirebaseContext } from './index';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState(null);
  const firebaseInstance = useContext(FirebaseContext);

  // Function to handle signing in with Google account
  const handleSignIn = () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    firebaseInstance.auth().signInWithPopup(provider);
  };

  // Function to handle signing out
  const handleSignOut = () => {
    firebaseInstance.auth().signOut();
  };

  // Listen for changes in user authentication state
  firebaseInstance.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
          <button onClick={handleSignOut}>Sign Out</button>
          <Chat />
        </div>
      ) : (
        <div>
          <h1>Please sign in to continue.</h1>
          <button onClick={handleSignIn}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
