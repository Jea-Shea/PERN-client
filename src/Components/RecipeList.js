import React from 'react'
import RecipeItem from './RecipeItem'

console.log('hi');
const RecipeList = (props) => {


    return (
        <div>
            {props.recipes.map((recipeObj, i) => <p key={i}>  {recipeObj.name} </p>)}
        </div>
    )
};

export default RecipeList;

/// ADD CATCH SO IF RECIPES IS EMPTY THERES A MESSAGE
