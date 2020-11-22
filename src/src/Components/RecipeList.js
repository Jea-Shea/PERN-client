import React, { useState, useEffect } from "react";
import { XGrid } from "@material-ui/x-grid";
import Recipes from "./Recipe";

//import RecipeItem from './RecipeItem'

const RecipeList = (props) => {
  const { sessionToken, selection, setSelection, recipes } = props;
  const [buttonsEnable, setButtonsEnable] = useState(false);

  useEffect(() => setSelection(null), []);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Recipe", width: 190 },
    { field: "ingredients", headerName: "Ingredients", width: 350 },
    { field: "instructions", headerName: "Instructions", width: 600 },
    { field: "user", headerName: "User", width: 90 },
  ];

  const editRecipeButton = () => {
    console.log("Edit");
  };

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <XGrid
          rows={recipes || []}
          columns={columns}
          pageSize={5}
          onSelectionChange={(newSelection) => {
            console.log(newSelection.rowIds[0]);
            if (selection !== newSelection.rowIds[0]) {
              setSelection(newSelection.rowIds[0]);
            }
            setButtonsEnable(true);
            editRecipeButton();
          }}
        />
      </div>
    </div>
  );
};

export default RecipeList;