import React, { useState } from 'react';

const RecipeCreate = (props) => {

    const [nameOfRecipe, setNameOfRecipe] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')

    const resetForm = () => {
        setNameOfRecipe('')
        setIngredients('')
        setInstructions('')
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        

        const body = {
            name: nameOfRecipe,
            ingredients: ingredients,
            instructions: instructions,
        }
        fetch('http://localhost:8080/recipes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
            .then(rObj => {
                console.log(rObj);
                resetForm()
                props.fetchRecipes() // do we need this <-
           } )
    }


    return (
        <div>
            <form>
                <label htmlFor="nameOfRecipe">Name</label>
                <input id="nameOfRecipe" value={nameOfRecipe} onChange={e => setNameOfRecipe(e.target.value)}/>
                <br />
                <label htmlFor="ingredients">Ingredients</label>
                <input id="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
                <br />
                <label htmlFor="instructions">Instructions</label>
                <input id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)}/>
                <br />
                <button onClick={handleSubmit}>Save Recipe</button>
                <button id="resetForm" onClick={resetForm} type="button">Reset</button>
            </form>
        </div>
    )
};

export default RecipeCreate;