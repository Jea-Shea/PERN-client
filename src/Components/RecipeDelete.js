import React, { useState } from 'react';
import APIURL from '../environment'


const RecipeDelete = (props) => {

const [clear, setClear] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('youve clicked delete');
        console.log(props.recipes);

    }
        fetch(`${APIURL}/recipes/delete/:id`, {
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
