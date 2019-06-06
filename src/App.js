import React from 'react';

import styled from 'styled-components';

import Welcome from './components/Welcome';
import CharacterBackground from './components/CharacterBackground';

import './App.css';

function App() {
  return (
    <div className="App ">
      <Welcome />
      <Content>
        <CharacterBackground />
      </Content>
    </div>
  );
}

export default App;

const Content = styled.div`
  display: flex;
`;
