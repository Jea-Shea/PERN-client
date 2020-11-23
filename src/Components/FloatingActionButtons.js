import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import APIURL from "../environment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();

  const {
    deleteRecipe,
    editRecipe,
    setEdits,
    edits,
    addToGroceries,
    setSelection,
    selection,
  } = props;

  return (
    <div className={classes.root}>
      <Fab
        color="secondary"
        aria-label="edit"
        variant="extended"
        onClick={() => {
          setEdits(!edits);
        }}
        disabled={edits || selection == null}
      >
        Edit Recipe
        <EditIcon />
      </Fab>
      <Fab
        variant="extended"
        color="primary"
        disabled={edits || selection == null}
        onClick={addToGroceries}
      >
        <AddShoppingCartIcon className={classes.extendedIcon} />
        Add items to shopping cart
      </Fab>
      <Fab
        color="secondary"
        aria-label="delete"
        variant="extended"
        onClick={() => {
          deleteRecipe();
          setSelection(null);
        }}
        disabled={edits || selection == null}
      >
        <DeleteIcon />
        Delete Recipe
      </Fab>
    </div>
  );
}
