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
const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  useEffect(() => {
    setNameError(!/[\w]+/.test(name));
  }, [name]);
  useEffect(() => {
    setEmailError(!/.+@.+\..{2}.*/.test(email));
  }, [email]);
  useEffect(() => {
    if (
      password.length > 7 &&
      /.*[a-z]/.test(password) &&
      /.*[A-Z]/.test(password) &&
      /.*[0-9]/.test(password) &&
      /.*[!@#\$\%\^\&\*\(\),\<\.\>\[\]\{\}\?\/~\|'";:]/.test(password)
    ) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [password]);

  let handleSubmit = (event) => {
    if (
      !emailError &&
      !passwordError &&
      !nameError &&
      name &&
      email &&
      password
    ) {
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
    }
  };
  return (
    <div>
      <h1>SIGNUP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            error={nameError}
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            helperText={nameError && name ? "Invalid name" : ""}
          />
        </div>
        <div>
          <TextField
            error={emailError}
            id="email"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            helperText={emailError && email ? "Invalid email address" : ""}
          />
        </div>
        <div>
          <TextField
            error={passwordError}
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            helperText={
              passwordError && password ? (
                <div>
                  <div>Password must be 8 characters or longer,</div>
                  <div>contain upper- & lower-case letters,</div>
                  <div>a number, and a special character</div>
                </div>
              ) : (
                ""
              )
            }
          />
        </div>
        <div>
          {!emailError &&
          !passwordError &&
          !nameError &&
          name &&
          email &&
          password ? (
            <IconButton type="submit">
              <PersonAddIcon color="primary" style={{ fontSize: 40 }} />
            </IconButton>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
