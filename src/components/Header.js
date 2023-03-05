import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';

function Header({ fName, id, handleSignIn, handleSignOut, user }) {



  return (
    <header className="flex flex-row justify-between py-4 pl-4 pr-0.5 border-b-2 bg-zinc-800 border-zinc-400 shadow-2xl ">
      <div className="inline-flex">
        <h1
          className="text-2xl font-bold text-white"
        >jCircle9</h1>
        <div>{fName}</div>
      </div>
      <div>
        <button
          className="p-2 ml-4 border rounded-md text-violet-600 text-md bg-zinc-200 border-zinc-400 hover:border-white hover:scale-125"
        >
          <Link to="./chat">
            {user ? 'Chat' : '💬'}
          </Link>
        </button>
        <button
          className="p-2 ml-4 border rounded-md text-violet-600 text-md bg-zinc-200 border-zinc-400 hover:border-white hover:scale-125"
        >
          <Link to="./recipes">
            {user ? 'Recipes' : '🍽️'}
          </Link>
        </button>
        <button
          className="p-2 ml-4 border rounded-md text-violet-600 text-md bg-zinc-200 border-zinc-400 hover:border-white hover:scale-125"
        >
          <Link to="./weather">
          {user ? 'Weather'  : '☁️'}
          </Link>
        </button>
        <button
          className="p-2 ml-4 border rounded-md text-violet-600 text-md bg-zinc-200 border-zinc-400 hover:border-white hover:scale-125"
        >
          <Link to="./profile">
            {user ? 'Settings' : '🔧'}
          </Link>
        </button>
        <button
          className="p-2 mx-4 border rounded-md bg-violet-600 text-md text-zinc-800 border-zinc-400 hover:text-white hover:border-white hover:scale-125"

        >
          <LoginButton user={user} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
        </button>
      </div>
    </header>
  );
}

export default Header;