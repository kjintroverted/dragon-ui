import React from 'react';
import logo from './logo.svg';

import Welcome from './components/Welcome';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 
        <Welcome/>
      </header>
    </div>
  );
}

export default App;
