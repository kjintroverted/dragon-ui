import React from 'react';
import logo from './logo.svg';

import Welcome from './components/Welcome';
import './App.css';
import CharacterBackground from './components/CharacterBackground';

function App() {
  return (
    <div className="App ">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
        <CharacterBackground />
      </header>
    </div>
  );
}

export default App;
