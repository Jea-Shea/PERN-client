import React from 'react'
import RecipeItem from './RecipeItem'

console.log('hi');
const RecipeList = (props) => {


    return (
        <div>
             {props.recipe.map((recipeObj, i) => <RecipeItem recipe={recipeObj} key={i} />)}
        </div>
    )
};

export default RecipeList;
