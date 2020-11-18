import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));
const Login = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      body: JSON.stringify({
        user: { name: name, email: email, passwordHash: password },
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
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            <PersonAddIcon color="primary" style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
