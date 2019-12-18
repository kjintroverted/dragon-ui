import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import OwnerView from "./containers/OwnerView";
import PartyView from "./containers/PartyView";

import "./App.css";

function App() {
  const [user, updateUser] = useState();

  async function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user: info } = await firebase.auth().signInWithPopup(provider);
    updateUser({ name: info.displayName, email: info.email, photo: info.photoURL });
  }

  firebase.auth().onAuthStateChanged(function (info) {
    if (info) {
      console.log("new user");
      if (!user)
        updateUser({ name: info.displayName, email: info.email, photo: info.photoURL });
    } else {
      updateUser(null)
      login();
    }
  });

  return (
    <Router>
      <div className='App '>
        <NavBar user={ user } />
        { user && (
          <Content>
            <Route
              path='/'
              exact
              component={ () => <OwnerView owner={ user.email } /> }
            />
            <Route
              path='/character'
              exact
              component={ props => <PartyView { ...props } /> }
            />
          </Content>
        ) }
      </div>
    </Router>
  );
}

export default App;

const Content = styled.div`
  display: flex;
  margin-top: 5em;
`;
