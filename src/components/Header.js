import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';

function Header({ fName, id, handleSignIn, handleSignOut, user }) {



  const goBack = () => {
    window.history.back();
  };

  return (
    <header className="flex flex-row justify-between py-4 pl-4 pr-0.5 border-b-2 bg-zinc-800 border-zinc-400">
      <div className="inline-flex">
        <h1
          className="text-2xl font-bold text-white"
        >jCircle9</h1>
        <div>{fName}</div>
      </div>
      <div>
        <button
          className="p-2 ml-4 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700 hover:scale-125"
        >
          <Link to="./chat">Chat</Link>
        </button>
        <button
          className="p-2 ml-4 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700 hover:scale-125"
        >
          <Link to="./recipes">Recipes</Link>
        </button>
        <button
          className="p-2 ml-4 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700 hover:scale-125"
        >
          <Link to="./weather">Weather</Link>
        </button>
        <button
          className="p-2 ml-4 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700 hover:scale-125"
        >
          <Link to="./profile">Profile</Link>
        </button>
        <button
                  className="p-2 ml-4 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700 hover:scale-125"

        >
        <LoginButton user={user} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
        </button>
      </div>
    </header>
  );
}

export default Header;