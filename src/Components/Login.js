import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ForwardIcon from "@material-ui/icons/Forward";

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
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  useEffect(() => {
    setPasswordValid(true);
  }, [password]);
  useEffect(() => {
    setEmailValid(/.*@\..*/.test(email));
  }, [email]);
  let handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/user/login", {
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
            error={emailValid}
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
            <ForwardIcon color="primary" style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
