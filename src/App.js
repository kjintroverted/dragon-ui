import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

import Welcome from './components/Welcome';
import CharacterBackground from './components/CharacterBackground';

import './App.css';

function App() {
  login();
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

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  console.log(provider);
  firebase.auth().signInWithPopup(provider).then((result) => {
    const { user } = result;
    console.debug('Logged in as', user.displayName);
    console.debug(user.email);
  }).catch((error) => {
    alert(error.message);
  });
}
