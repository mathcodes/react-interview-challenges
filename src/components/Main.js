import React from 'react'

import { GiMeal } from 'react-icons/gi'


export default function Main() {
  return (
<div class="text-white container">

    <h1 class="text-4xl font-bold text-white text-center pt-10">Welcome!</h1>
    <div class="flex flex-row justify-center">
      <h3 class="flex text-2xl font-bold text-white text-center pt-10">Recipe Grabber - </h3>
      <p><GiMeal />
      This app utilizes Tailwind CSS, React, Firebase, and some 3rd-party APIs to create a recipe search engine. Users can search for recipes by ingredient, and save recipes to their
      </p>
   </div>
  </div>
  )
}
