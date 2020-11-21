import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import FloatingActionButtons from './FloatingActionButtons'

const RecipeListt = (props) => {
const {sessionToken} = props;
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Recipe', width: 190 },
  { field: 'ingredients', headerName: 'Ingredients', width: 450 },
  { field: 'instructions', headerName: 'Instructions', width: 450 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'favorite', headerName: 'Favorite', width: 120}
];

const [ buttonsEnable, setButtonsEnable ] = useState(true);
const [, setSelection] = useState([]);
const editRecipeButton = () => {
  console.log("Edit button enabled function called");
}
    return (
        <div>
          <FloatingActionButtons sessionToken={sessionToken} buttonsEnable={buttonsEnable}/>
          <div style={{ height: 400, width: '100%' }}>
          
          <DataGrid 
          rows={props.recipes} 
          columns={columns} 
          pageSize={5}
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
            console.log(newSelection.rowIds);
            setButtonsEnable(false);
            editRecipeButton();
          }}/>
          </div>
        </div>
    )
};

export default RecipeListt;