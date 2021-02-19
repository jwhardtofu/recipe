import React, {useEffect, useState} from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = 'fa9bcedb';
  const APP_KEY = '22dcb7e72241a3c61b16998b71ee03f2';
  // const request =  `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
  }

  return(
  <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input 
        className="search-bar" 
        type="text" 
        value={search} 
        onChange={updateSearch} 
      />
      <button 
        className="search-button" 
        type="submit">
      Search
      </button>
    </form>
    <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.title}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  </div>
  );
}

export default App;
