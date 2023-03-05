import React, { useState, useContext } from 'react';
import { firebase } from './firebase/firebase';
import { FirebaseContext } from './firebase/index';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './components/Main';
import Chat from './components/Chat';
import Weather from './components/Weather';
import RecipeGrabber from './components/RecipeGrabber';
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
    firebase.auth().signOut();
  };

  // Listen for changes in user authentication state
  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });




  return (
    <Router>
      <div
          className="container h-screen bg-gradient-to-r from-zinc-900 to-zinc-800"
      >
        <Header user={user} fName={fName} handleSignIn={handleSignIn} handleSignOut={handleSignOut} id={user ? user.uid : null} />
        <Routes>
          <Route path="/" element={user ? <Main /> : <LoginPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/recipes" element={<RecipeGrabber />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/profile" element={user ? <UserProfile  user={user} handleLogout={handleSignOut} /> : <LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;