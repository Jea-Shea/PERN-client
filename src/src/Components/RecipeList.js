import React from 'react'
import RecipeItem from './RecipeItem'

console.log('hi');
const RecipeList = (props) => {

console.log(props.recipes);

  const showRecipes = () => {
    if (props.recipes.length !=0) {
      return props.recipes.map((recipeObj, i) => <p key={i}>  {recipeObj.name} </p>)
    }
  }


    return (
        <div>
          {showRecipes()}
        </div>
    )
};

export default RecipeList;

/// ADD CATCH SO IF RECIPES IS EMPTY THERES A MESSAGE
