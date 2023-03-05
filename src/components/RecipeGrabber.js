import React, { useState, useContext } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { FirebaseContext } from '../firebase/index';
import { database } from '../firebase/firebase';
import { firebase } from '../firebase/firebase';

const RecipeGrabber = () => {
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
    if (firebase.auth().currentUser) {
      const savedRecipesRef = database.ref(`savedRecipes/${firebase.auth().currentUser.uid}`);
      const newSavedRecipeRef = savedRecipesRef.push();
      newSavedRecipeRef.set({ ...recipe, rating: rating, favorite: true });
    }
  };



  const handleDeleteRecipe = (recipeId) => {
    console.log('delete recipe', recipeId);
    if (firebase.auth().currentUser) {
      const savedRecipeRef = database.ref(`savedRecipes/${firebase.auth().currentUser.uid}/${recipeId}`);
      savedRecipeRef.remove();
    }
  };

  const handleRating = (recipeId, ratingValue) => {
    console.log('rating', recipeId, ratingValue);
    if (firebase.auth().currentUser) {
      const savedRecipeRef = database.ref(`savedRecipes/${firebase.auth().currentUser.uid}/${recipeId}`);
      savedRecipeRef.update({ rating: ratingValue });
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center mx-auto mt-6 shadow-lg border-spacing-2">
      <form onSubmit={handleAddTag}>
        <input
          className="p-2 m-2 text-white border rounded-md bg-zinc-800 text-md border-zinc-400 hover:bg-violet-600"
        type="text" name="tag" placeholder="Add tag" />
        <button
          className="p-2 m-2 text-violet-600 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:bg-violet-600"
        type="submit">ADD</button>
      </form>
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center w-2/3 border">
          {tags.map((tag) => (
            <div
              className="p-2 m-2 text-violet-600 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
            key={tag}>
              {tag} <button
              className="p-2 text-violet-600 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:bg-violet-600 "
              onClick={() => handleRemoveTag(tag)}>X</button>
            </div>
          ))}
        </div>
      )}
      <button
        className="w-2/3 p-2 my-2 text-violet-600 bg-red-500 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:bg-violet-600"
      onClick={handleFindRecipes}>FIND RECIPES</button>
      <div className="grid grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="max-w-sm overflow-hidden border-2 rounded shadow-lg">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-48"
            />
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold text-white">{
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
                {firebase.auth().currentUser && savedRecipes && savedRecipes.find((r) => r.id === recipe.id) ? (
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