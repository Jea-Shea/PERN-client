
import React, { useState, useEffect } from "react";
import './App.css';
import Signup from './Components/Signup';
import Recipes from './Components/Recipes';

function App() {
  return (
    <div className="App">
      <Signup />
      <Recipes />
      
    </div>
  );
}

export default App;
