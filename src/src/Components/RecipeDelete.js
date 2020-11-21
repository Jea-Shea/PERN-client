import React, { useState } from 'react';


const RecipeDelete = (props) => {

    const [delete, setDelete] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('youve clicked delete');
        console.log(props.recipes);

    }
        fetch('http://localhost:8080/recipes/:id', {
            method: 'DELETE',
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
            <button onClick={}>DELETE</button>
        </div>
    )
};

export default RecipeCreate;