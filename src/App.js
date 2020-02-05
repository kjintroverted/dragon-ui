import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import OwnerView from "./containers/OwnerView";
import PartyView from "./containers/PartyView";
import fetchIntercept from 'fetch-intercept';

import "./App.css";

function App() {
  const [user, updateUser] = useState();

  async function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user: info } = await firebase.auth().signInWithPopup(provider);
    updateUser({ name: info.displayName, email: info.email, photo: info.photoURL });
  }

  firebase.auth().onAuthStateChanged(async function (info) {
    let unregister = function () { console.info("No interceptor registered.") };
    if (info) {
      const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
      unregister = fetchIntercept.register({
        request: function (url, config) {
          config = config || {}
          config = {
            ...config, headers: {
              Authorization: `Bearer ${ token }`
            }
          }
          return [url, config];
        }
      });

      if (!user) {
        updateUser({ name: info.displayName, email: info.email, photo: info.photoURL });
      }
    } else {
      unregister()
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
