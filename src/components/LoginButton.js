import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase } from '../firebase/firebase';
import { FiLogOut as Logout } from 'react-icons/fi';
import { FiLogIn as Login } from 'react-icons/fi';

const LoginButton = () => {
  const [user] = useAuthState(firebase.auth());

  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      {user ? (
        <button
          onClick={handleSignOut}>
          <Logout />
        </button>
      ) : (
        <button

          onClick={handleSignIn}><Login /></button>
      )}
    </div>
  );
};

export default LoginButton;
