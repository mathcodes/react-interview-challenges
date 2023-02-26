import React, { useState, useContext } from 'react';
import { firebase } from './firebase/firebase';
import { FirebaseContext } from './index';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './components/Main';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import LoginPage from './components/LoginPage';
import './App.css';


function App() {
  const [user, setUser] = useState(null);
  const [fName, setFName] = useState(null);
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
    <Router>
      <div>
        <Header user={user} fName={fName} handleSignIn={handleSignIn} handleSignOut={handleSignOut} id={user ? user.uid : null} />
        <Routes>
          <Route path="/" element={user ? <Main /> : <LoginPage />} />
          <Route path="/profile" element={user ? <UserProfile /> : <LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;