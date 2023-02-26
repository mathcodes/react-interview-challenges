// import React, { useState } from 'react';

// const RecipeGrabber = () => {
//   const [recipes, setRecipes] = useState([]);

//   const handleFetchRecipes = async () => {
//     const response = await fetch('https://api.spoonacular.com/recipes/findByIngredients?apiKey=30f3274cbfe143059c9b4053147fba68&ingredients=apples,+flour,+sugar&number=2');
//     const data = await response.json();
//     setRecipes(data);
//   };

//   return (
//     <div>
//       <button onClick={handleFetchRecipes} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
//         Fetch Recipes
//       </button>
//       <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
//         {recipes.map(recipe => (
//           <div key={recipe.id} className="overflow-hidden bg-white rounded-lg shadow-lg">
//             <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-64" />
//             <div className="p-4">
//               <h3 className="mb-2 text-lg font-medium">{recipe.title}</h3>
//               <div className="flex flex-wrap justify-between">
//                 {recipe.usedIngredients.map(ingredient => (
//                   <img src={`${ingredient.image}`} alt={ingredient.name} key={ingredient.name} className="object-cover w-8 h-8 mb-2 mr-2 rounded-full" />
//                 ))}
//                 {recipe.missedIngredients.map(ingredient => (
//                   <img src={`${ingredient.image}`} alt={ingredient.name} key={ingredient.name} className="object-cover w-12 h-12 p-1 mb-2 mr-2 border-2 border-red-600 rounded-full " />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>  );
// };

// export default RecipeGrabber;

// import React, { useState } from 'react';

// const RecipeGrabber = () => {
//   const [tags, setTags] = useState([]);
//   const [recipes, setRecipes] = useState([]);

//   const handleAddTag = (event) => {
//     event.preventDefault();
//     const newTag = event.target.elements.tag.value.trim();
//     if (newTag && !tags.includes(newTag)) {
//       setTags([...tags, newTag]);
//       event.target.elements.tag.value = '';
//     }
//   };

//   const handleRemoveTag = (tagToRemove) => {
//     setTags(tags.filter(tag => tag !== tagToRemove));
//   };

//   const handleFindRecipes = async () => {
//     const ingredients = tags.join(',');
//     const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=30f3274cbfe143059c9b4053147fba68&ingredients=${ingredients}&number=5`);
//     const data = await response.json();
//     setRecipes(data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleAddTag}>
//         <label htmlFor="tag" className="mr-2">Add Tag:</label>
//         <input type="text" name="tag" className="px-4 py-2 mr-2 border rounded-lg" />
//         <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Add</button>
//       </form>
//       <div className="flex flex-wrap mt-4">
//         {tags.map(tag => (
//           <div key={tag} className="flex items-center justify-between px-4 py-2 mt-2 mr-2 text-sm bg-white rounded-full">
//             {tag}
//             <button onClick={() => handleRemoveTag(tag)} className="text-gray-400 hover:text-gray-600">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         ))}
//       </div>
//       <button onClick={handleFindRecipes} className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Find Recipes</button>
//       <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
//         {recipes.map(recipe => (
//           <div key={recipe.id} className="overflow-hidden bg-white rounded-lg shadow-lg">
//             <img src={recipe.image} alt={recipe.title}
//         className="object-cover w-full h-48" />
//         <div className="px-6 py-4">
//           <div className="mb-2 text-xl font-bold">{recipe.title}</div>
//           <p className="text-base text-gray-700">
//             Missed Ingredients: {recipe.missedIngredients.map(ingredient => ingredient.name).join(', ')}
//           </p>
//           <p className="text-base text-gray-700">
//             Used Ingredients: {recipe.usedIngredients.map(ingredient => ingredient.name).join(', ')}
//           </p>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
// );
// };

// export default RecipeGrabber;


import React, { useState, useContext } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { FirebaseContext } from '../index';
import { database } from '../firebase/firebase';

const RecipeGrabber = () => {
  const firebaseInstance = useContext(FirebaseContext);
  // const { firebase, savedRecipes } = useContext(FirebaseContext);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [tags, setTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [rating, setRating] = useState(null);

  const handleAddTag = (event) => {
    event.preventDefault();
    const tag = event.target.tag.value.trim();
    if (tag !== '' && !tags.includes(tag)) {
      setTags([...tags, tag]);
      event.target.tag.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFindRecipes = (event) => {
    event.preventDefault();
    const ingredients = tags.join(',');
    const apiKey = '30f3274cbfe143059c9b4053147fba68';
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=10`;
    // const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=30f3274cbfe143059c9b4053147fba68&query=tomatoes&number=10`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveRecipe = (recipe) => {
    console.log('save recipe', recipe);
    if (firebaseInstance.auth().currentUser) {
      const savedRecipesRef = database.ref(`savedRecipes/${firebaseInstance.auth().currentUser.uid}`);
      const newSavedRecipeRef = savedRecipesRef.push();
      newSavedRecipeRef.set({ ...recipe, rating: rating, favorite: true });
    }
  };



  const handleDeleteRecipe = (recipeId) => {
    console.log('delete recipe', recipeId);
    if (firebaseInstance.auth().currentUser) {
      const savedRecipeRef = database.ref(`savedRecipes/${firebaseInstance.auth().currentUser.uid}/${recipeId}`);
      savedRecipeRef.remove();
    }
  };

  const handleRating = (recipeId, ratingValue) => {
    console.log('rating', recipeId, ratingValue);
    if (firebaseInstance.auth().currentUser) {
      const savedRecipeRef = database.ref(`savedRecipes/${firebaseInstance.auth().currentUser.uid}/${recipeId}`);
      savedRecipeRef.update({ rating: ratingValue });
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleAddTag}>
        <input type="text" name="tag" placeholder="Add tag" />
        <button type="submit">ADD</button>
      </form>
      {tags.length > 0 && (
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              {tag} <button onClick={() => handleRemoveTag(tag)}>X</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleFindRecipes}>FIND RECIPES</button>
      <div className="grid grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="max-w-sm overflow-hidden rounded shadow-lg">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-48"
            />
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold">{
            recipe.title}</div>
            <div className="mb-2">
              {recipe.usedIngredients.map((ingredient) => (
                <span key={ingredient.id} className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                  {ingredient.name}
                </span>
              ))}
              {recipe.missedIngredients.map((ingredient) => (
                <span key={ingredient.id} className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                  {ingredient.name}
                </span>
              ))}
            </div>
            <p className="text-base text-gray-700">{recipe.summary}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-yellow-500">
                  {Array.from({ length: Math.round(recipe.spoonacularScore / 20) }).map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </span>
              </div>
              <div>
                {firebaseInstance.auth().currentUser && savedRecipes && savedRecipes.find((r) => r.id === recipe.id) ? (
                  <FaHeart
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteRecipe(recipe.id)}
                  />
                ) : (
                  <FaRegHeart className="text-red-500 cursor-pointer" onClick={() => handleSaveRecipe(recipe)} />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <select
                  value={rating ? rating : ''}
                  onChange={(event) => handleRating(recipe.id, event.target.value)}
                  className="px-2 py-1 border border-gray-400 rounded-md"
                >
                  <option value="">--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

);
};

export default RecipeGrabber;