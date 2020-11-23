import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ForwardIcon from "@material-ui/icons/Forward";
import APIURL from '../environment'

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
  const [emailError, setEmailError] = useState(true);
  useEffect(() => {
    setEmailError(!/.+@.+\..{2}.*/.test(email));
  }, [email]);
  let handleSubmit = (event) => {
    event.preventDefault();
    if (!emailError && email && password) {
      console.log(APIURL);
      fetch(`${APIURL}/user/login`, {
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
    }
  };
  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            error={emailError}
            id="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            helperText={emailError && email ? "Invalid email address" : ""}
          />
        </div>
        <div>
          <TextField
            error={password.length < 8}
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {emailError || password.length < 8 ? (
            ""
          ) : (
            <IconButton type="submit">
              <ForwardIcon color="primary" style={{ fontSize: 40 }} />
            </IconButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
