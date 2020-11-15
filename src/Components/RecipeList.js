import React from 'react'
import RecipeItem from './RecipeItem'

console.log('hi');
const RecipeList = (props) => {


 const allRecipes = () => {
 if (props.recipes) {
                 return props.recipes.map((recipeObj, i) => <p key={i}>  {recipeObj.name} </p>
                 )};
                 
 }

    return (
        <div>
            {allRecipes()}
        </div>
    )
};

export default RecipeList;
