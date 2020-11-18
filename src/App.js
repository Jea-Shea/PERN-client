import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Logo from "./Components/Logo";
import NavTabs from "./Components/NavTabs";
import AppBar from "./Components/AppBar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#bef67a",
      main: "#8bc34a",
      dark: "#5a9216",
      contrastText: "#000",
    },
    secondary: {
      light: "#ffd95b",
      main: "#ffa726",
      dark: "#c77800",
      contrastText: "#000",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  const [sessionToken, setSessionToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };
  return sessionToken ? (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar />
        <NavTabs sessionToken={sessionToken} updateToken={updateToken} />
      </div>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar />
        <Login updateToken={updateToken} />
        <Signup updateToken={updateToken} />
      </div>
    </ThemeProvider>
  );
}

export default App;
