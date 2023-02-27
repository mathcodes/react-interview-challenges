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
        >Backed</h1>
<div>{fName}</div>
      </div>
      <div>
        <button
            className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700"
            >
            <Link to="./chat">Chat</Link>
          </button>
        <button
            className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700"
            >
            <Link to="./recipes">Recipes</Link>
          </button>
        <button
            className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700"
            >
            <Link to="./profile">Profile</Link>
          </button>
        {user ? (
          <button
          className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700"
          onClick={handleSignOut}>Logout</button>
        ) : (
          <button
          className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700"
          onClick={handleSignIn}>Login</button>
        )}
      </div>
    </header>
  );
}

export default Header;