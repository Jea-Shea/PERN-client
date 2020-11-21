import React from 'react'


const RecipeItem = (props) => {

    return (
    <div className="recipe-card">
        <h3>{props.recipe.name}</h3>
    </div>
    )
};
console.log('hi');
export default RecipeItem;