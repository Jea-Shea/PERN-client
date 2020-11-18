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

export default function ShoppingList(props) {
  const classes = useStyles();
  const { sessionToken } = props;
  const [groceries, setGroceries] = useState([""]);

  useEffect(() => {
    fetch("http://localhost:8080/user/groceries", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => setGroceries(json))
      .catch((err) => console.log(err));
  }, []);

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
    let user = { groceries: groceries };
    fetch("http://localhost:8080/user/groceries/update", {
      method: "PUT",
      body: JSON.stringify({ user }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
            <DeleteIcon color="secondary" />
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
        <AddIcon color="primary" style={{ fontSize: 40 }} />
      </IconButton>
      <IconButton aria-label="save" onClick={saveGroceries}>
        <SaveIcon color="primary" style={{ fontSize: 40 }}/>
      </IconButton>
    </>
  );
}
