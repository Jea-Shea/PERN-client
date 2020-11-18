import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function GroceryList() {
  const classes = useStyles();
  const [groceries, setGroceries] = useState(["carrots", "celery", "onion"]);

  const addGrocery = () => {
    setGroceries([...groceries, ""]);
  };

  const deleteGrocery = (index, event) => {
    let values = [...groceries];
    if (index > 0 || groceries.length > 1) {
      values.splice(index, 1);
    } else {
      values[0] = [""];
    }
    setGroceries(values);
  };

  const saveGroceries = () => {
    console.log(groceries);
  };

  const handleInputChange = (index, event) => {
    const values = [...groceries];
    values[index] = event.target.value;
    setGroceries(values);
  };

  // fetch groceries
  const handleGroceries = () => {
    return groceries.map((grocery, i) => {
      return (
        <div className="groceryItem">
          <TextField
            key={i}
            id={i}
            size="small"
            margin="dense"
            value={grocery}
            onChange={(event) => handleInputChange(i, event)}
            autoFocus
          />
          <IconButton
            aria-label="delete"
            onClick={(event) => deleteGrocery(i, event)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGrocery();
  };

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {handleGroceries()}
      </form>
      <IconButton aria-label="add" onClick={addGrocery}>
        <AddIcon />
      </IconButton>
      <IconButton aria-label="save" onClick={saveGroceries}>
        <SaveIcon />
      </IconButton>
    </>
  );
}
