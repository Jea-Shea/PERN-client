import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
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
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify({
        user: { email: email, passwordHash: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => props.updateToken(data.sessionToken));
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <IconButton type="submit">
            <ExitToAppIcon />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
