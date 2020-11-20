import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" disabled aria-label="add" variant="extended">
        <AddIcon />
        Add Recipe
      </Fab>
      <Fab color="secondary" disabled aria-label="edit" variant="extended">
        <EditIcon />
        Edit Recipe
      </Fab>
      <Fab variant="extended" disabled>
        <AddShoppingCartIcon className={classes.extendedIcon} />
        Add all items to shopping list
      </Fab>
      <Fab disabled aria-label="like">
        <FavoriteIcon />
      </Fab>
    </div>
  );
}
