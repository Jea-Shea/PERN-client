import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import APIURL from '../environment'

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    margin: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Account(props) {
  const classes = useStyles();
  const { updateToken } = props;
  const clearToken = () => {
    localStorage.clear();
    updateToken("");
  };
  return (
    <div>
      <div>
        <Fab
        className={classes.root}
        aria-label="clear"
        variant="extended"
        color="primary"
        onClick={clearToken}>Change Name</Fab>
      </div>
      <div>
        <Fab
        className={classes.root}
        aria-label="clear"
        variant="extended"
        color="primary"
        onClick={clearToken}>Change Email</Fab>
      </div>
      <div>
        <Fab
        className={classes.root}
        aria-label="clear"
        variant="extended"
        color="primary"
        onClick={clearToken}>Change Password</Fab>
      </div>
      <Fab 
        className={classes.root}
        aria-label="clear"
        variant="extended"
        color="secondary"
        onClick={clearToken}>
        LOGOUT
        <ExitToAppIcon />
      </Fab>
      <Fab 
        className={classes.root}
        aria-label="clear"
        variant="extended"
        color="secondary"
        onClick={clearToken}>
        Delete Account
        <DeleteIcon />
      </Fab>
    </div>
  );
}
