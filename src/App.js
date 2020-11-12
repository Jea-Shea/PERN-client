
import React, { useState, useEffect } from "react";
import './App.css';
import Signup from './Components/Signup';
import Recipes from './Components/Recipes';

function App() {

  const [sessionToken, setSessionToken] = useState(undefined); 
  console.log(sessionToken);

useEffect( 
  () => {
    const token = localStorage.getItem('token')
    if (token) {
      setSessionToken(token)
    }
  }, []
)

  const updateToken = (newToken) => {
    setSessionToken(newToken)
    localStorage.setItem('token' , newToken)

  }

  const clearToken = () => {
      setSessionToken(undefined)
      localStorage.clear()
  };

  return (
    <div className="App">
      <Signup />
      <Recipes />

      {  !sessionToken ? <Signup updateToken={updateToken} /> : <Recipes sessionToken={sessionToken} /> }

      
    </div>
  );
}

export default App;
