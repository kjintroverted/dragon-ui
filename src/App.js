import React from 'react';
import styled from 'styled-components';

import Welcome from './components/Welcome';

import './App.css';
import OwnerView from './components/OwnerView';

function App() {
  return (
    <div className="App ">
      <Welcome />
      <Content>
        <OwnerView />
      </Content>
    </div>
  );
}

export default App;

const Content = styled.div`
  display: flex;
`;
