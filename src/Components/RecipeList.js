import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Recipes from "./Recipe";

//import RecipeItem from './RecipeItem'



const RecipeList = (props) => {


const {sessionToken} = props;


  
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Recipe', width: 190 },
  { field: 'ingredients', headerName: 'Ingredients', width: 130 },
  { field: 'instructions', headerName: 'Instructions', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },


];




    return (
        <div>
          
          <div style={{ height: 400, width: '100%' }}>
          
        <DataGrid rows={props.recipes} columns={columns} pageSize={5} checkboxSelection  />
    </div>

        </div>
    )
};

export default RecipeList;