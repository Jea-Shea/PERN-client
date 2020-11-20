import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Account(props) {
  const { updateToken } = props;
  const clearToken = () => {
    localStorage.clear();
    updateToken("");
  };
  return (
    <div>
      <h1>Logout</h1>
      <IconButton onClick={clearToken}>
        <ExitToAppIcon color="primary" style={{ fontSize: 40 }} />
      </IconButton>
    </div>
  );
}
