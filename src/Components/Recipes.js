import React, {useState, useEffect} from 'react';


import RecipeCreate from './RecipeCreate';
import RecipeList from './RecipeList';


const Recipes = (props) => {

    const [recipes, setRecipes] = useState([]);

    useEffect(
        () => {
            fetchRecipes()
        }, []
    )


    const fetchRecipes = () => {
        fetch('http://localhost:8080/recipe/', {
            method: 'GET',
            }).then(r => r.json())
            .then(rArr => setRecipes(rArr))
            .then(console.log((json)))
        };

    return(
        <div>
            <RecipeCreate  fetchRecipes={fetchRecipes} />
            <hr />
           <RecipeList recipes={recipes} /> 
        </div>
    )
};


export default Recipes;

//props will go in the return here. Be more specific with syntax