import React from 'react';
import { Link } from 'react-router-dom';

function Header({ fName, id, handleSignIn, handleSignOut, user }) {



  const goBack = () => {
    window.history.back();
  };

  return (
    <header className="flex flex-row justify-between p-4 bg-sky-500">
      <div className="inline-flex">
        <h1
          className="text-2xl font-bold text-white"
        >Chat App</h1>
<div>{fName}</div>
      </div>
      <div>
        <button
          className="inline-flex px-4 py-2 font-bold text-white rounded flex-end bg-sky-400 hover:bg-sky-300"
          >
            <Link to="./">Chat</Link>
          </button>
        <button
          className="inline-flex px-4 py-2 font-bold text-white rounded flex-end bg-sky-400 hover:bg-sky-300"
          >
            <Link to="./profile">Profile</Link>
          </button>
        {user ? (
          <button
            className="px-4 py-2 font-bold text-white rounded bg-sky-400 hover:bg-sky-300"
            onClick={handleSignOut}>Logout</button>
        ) : (
          <button
            className="px-4 py-2 font-bold text-white rounded bg-sky-400 hover:bg-sky-300"
            onClick={handleSignIn}>Login</button>
        )}
      </div>
    </header>
  );
}

export default Header;