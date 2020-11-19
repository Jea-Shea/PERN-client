import React, { useState } from 'react';

const RecipeCreate = (props) => {

    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')

    const resetForm = () => {
        setName('')
        setIngredients('')
        setInstructions('')
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('youve clicked submit');
        console.log(props.recipes);
        const body = {
            recipes: {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
        }
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
           } ) 
    }


    return (
        <div>
            <form>
                <label htmlFor="nameOfRecipe">Name</label>
                <input id="nameOfRecipe" value={name} onChange={e => setName(e.target.value)}/>
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


/*
*/