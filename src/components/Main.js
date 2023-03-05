import React from 'react'

import { GiMeal } from 'react-icons/gi'
import { BsChatDotsFill } from 'react-icons/bs'
import { BsCloudFill } from 'react-icons/bs'

export default function Main({ handleSignInWithGoogle }) {
  return (
    <div class="text-white container m-auto">

      <h1 class="text-4xl font-bold text-white text-center pt-10">Welcome!</h1>
      <h4 className="my-10 text-2xl">This app utilizes Tailwind CSS, React, Firebase, and some 3rd-party APIs!</h4>
      <h4 className="my-10 text-2xl">
        <button
          className="p-2 m-1 text-sky-500 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-sky-500"
          onClick={handleSignInWithGoogle}>Login</button>then click on the icon or link in the header to explore!</h4>

      <div class="p-1 my-2  ">
        <div class="flex flex-row justify-around ">
          <div class="bg-zinc-200 justify-center flex shadow-lg rounded p-1 m-4 w-24 h-24">
            <a href="./recipes" alt="Recipe Grabber" className="my-auto">
              <GiMeal className="text-4xl text-sky-500 scale-150 rounded bg-zinc-200 hover:scale-125" />
            </a>
          </div>
          <div class="bg-zinc-200 justify-center flex shadow-lg rounded p-1 m-4 w-24 h-24">
            <a href="./chat" alt="Chat" className="my-auto">
              <BsChatDotsFill className="justify-center p-1 text-4xl text-sky-500 scale-150 bg-zinc-200 hover:scale-125" />
            </a>
          </div>
          <div class="bg-zinc-200 justify-center flex shadow-lg rounded  p-1 m-4 w-24 h-24">
            <a href="./weather" alt="Weather" className="my-auto">
              <BsCloudFill className="text-2xl text-sky-500 scale-150 bg-zinc-200 hover:scale-125" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
