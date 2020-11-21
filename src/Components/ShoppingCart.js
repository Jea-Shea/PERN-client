import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ShoppingList(props) {
  const classes = useStyles();
  const { sessionToken } = props;
  const [groceries, setGroceries] = useState([""]);
  const inputRef = useRef({});

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
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFocus = (i) => {
    inputRef.current[i].focus();
  };

  const addGrocery = () => {
    if (groceries[groceries.length - 1] != "") {
      setGroceries([...groceries, ""]);
    }
  };

  const deleteGrocery = (index, event) => {
    let values = [...groceries];
    if (index > 0 || groceries.length > 1) {
      values.splice(index, 1);
    } else {
      values[0] = "";
    }
    handleFocus(index > 0 ? index - 1 : index);
    setGroceries(values);
  };

  const removeEmptyAndDup = () => {
    if (groceries[0] !== "" && groceries.length > 0) {
      let grocerySet = [...new Set(groceries)].filter((i) => i.length > 0);
      console.log(grocerySet);
      handleFocus(grocerySet.length < 1 ? 0 : grocerySet.length - 1);
      setGroceries(grocerySet);
      return grocerySet;
    }
  };

  const saveGroceries = (grocerySet) => {
    let user = { groceries: grocerySet };
    console.log(user.groceries);
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
    handleFocus(index);
    setGroceries(values);
  };

  const handleKeyPress = (index, event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addGrocery();
    } else if (
      event.key === "Backspace" &&
      groceries[index] === "" &&
      index > 0
    ) {
      event.preventDefault();
      deleteGrocery(index, event);
    } else if (event.key === "Delete") {
      event.preventDefault();
      const values = [...groceries];
      values[index] = "";
      handleFocus(index);
      setGroceries(values);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      handleFocus(index > 0 ? index - 1 : index);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      handleFocus(index < groceries.length - 1 ? index + 1 : index);
    }
  };

  const handleGroceries = () => {
    if (groceries) {
    return groceries.map((grocery, i) => {
      return (
        <div className="groceryItem">
          <TextField
            key={i}
            id={i}
            size="small"
            margin="dense"
            value={grocery}
            onChange={(event) => {
              handleInputChange(i, event);
            }}
            onKeyDown={(event) => handleKeyPress(i, event)}
            inputRef={(input) => (inputRef.current[i] = input)}
            autoFocus
          />
          <IconButton
            aria-label="delete"
            onClick={(event) => deleteGrocery(i, event)}
          >
            <ClearIcon color="secondary" />
          </IconButton>
        </div>
      );
    });
    } else {
      setGroceries([""]);
    }
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
      <Fab
        className={classes.root}
        aria-label="add"
        variant="extended"
        color="primary"
        onClick={addGrocery}
      >
        <AddIcon />
        Add
      </Fab>
      <Fab
        className={classes.root}
        aria-label="save"
        variant="extended"
        color="secondary"
        onClick={() => {
          saveGroceries(removeEmptyAndDup());
        }}
      >
        <SaveIcon />
        Save
      </Fab>
      <Fab
        className={classes.root}
        aria-label="clear"
        variant="extended"
        color="primary"
        onClick={() => {
          setGroceries([""]);
          handleFocus(0);
        }}
      >
        <ClearIcon />
        Clear
      </Fab>
    </>
  );
}