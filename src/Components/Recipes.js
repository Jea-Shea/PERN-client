import React, {useState, useEffect} from 'react';


import RecipeCreate from './RecipeCreate';
import RecipeList from './RecipeList';


const Recipes = (props) => {

    const [recipes, setRecipes] = useState({ name: '', ingredients: '', instructions: '' });

    useEffect(
        () => {
            fetchRecipes()
        }, []
    )


    const fetchRecipes = () => {
        fetch('http://localhost:8080/recipes/', {
            method: 'GET',
            headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.sessionToken
            }),
            }).then(r => r.json())
            .then(rArr =>  {
                console.log(rArr)
                setRecipes(rArr)})
            .then(console.log('please work'));
        
        };

    return(
        <div>
            <RecipeCreate  fetchRecipes={fetchRecipes} />
            <hr />
            <RecipeList recipes={recipes} />
            <h1>Printing Recipes?</h1>
        
        </div>
    )
};


export default Recipes;

//props will go in the return here. Be more specific with syntax

//<RecipeList recipes={recipes} /> 