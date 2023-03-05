import React from 'react'

import { GiMeal } from 'react-icons/gi'
import { BsChatDotsFill } from 'react-icons/bs'

export default function Main({handleSignInWithGoogle}) {
  return (
    <div class="text-white container m-auto">

      <h1 class="text-4xl font-bold text-white text-center pt-10">Welcome!</h1>
      <h4 className="my-10 text-2xl">This app utilizes Tailwind CSS, React, Firebase, and some 3rd-party APIs!</h4>
      <h4 className="my-10 text-2xl">

      <button
          className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700"
          onClick={handleSignInWithGoogle}>Login</button>then click on the icon or link in the header to explore!</h4>

      <div class="bg-zinc-200 shadow-lg rounded p-1 my-2  ">
        <div class="flex flex-row justify-around ">
          <div class="bg-zinc-200 shadow-lg rounded p-1 m-4 ">
            <a href="./recipes" alt="Recipe Grabber">
              <GiMeal className="text-4xl text-pink-500 rounded bg-zinc-200 hover:scale-125"/>
            </a>
          </div>
          <div class="bg-zinc-200 shadow-lg rounded p-1 m-4">
            <a href="./chat" alt="Chat">
              <BsChatDotsFill className="text-4xl text-pink-500 bg-zinc-200 hover:scale-125"/>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}