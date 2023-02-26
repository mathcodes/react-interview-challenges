import React from 'react'
import RecipeGrabber from './RecipeGrabber'
import Chat from './Chat'

export default function Main() {
  return (
<div class="w-full h-screen absolute top-0 left-0 z-0 bg-[../texture.svg]">
  <img src="../../texture.svg" alt="" class="w-full h-full absolute top-0 left-0 z-0"/>
  <Chat />
  <RecipeGrabber />
   </div>
  )
}
