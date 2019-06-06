import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

import NavBar from './components/NavBar';
import CharacterBackground from './components/CharacterBackground';

import './App.css';

function App() {
  const [user, updateUser] = useState();

  async function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await firebase.auth().signInWithPopup(provider);
    return { name: user.displayName, email: user.email, photo: user.photoURL };
  }

  useEffect(() => {
    (async function getUser() {
      const info = await login();
      updateUser(info);
    }());
  }, []);

  return (
    <div className="App ">
      <NavBar user={user} />
      { user
        && <Content>
          <CharacterBackground />
           </Content>
      }
    </div>
  );
}

export default App;

const Content = styled.div`
  display: flex;
`;
