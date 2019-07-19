import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

import { Avatar, IconButton } from '@material-ui/core';
import DungeonService from '../services/dungeonService';
import { Spacer } from './CustomStyled';


function NavBar({ user }) {
  // [Variable in State, Setter of Variable]
  // hooks are indicated by the word `use` (linter looks for use keyword)
  const [welcome, setWelcome] = useState('Just a moment...');

  // Effects run immediately after render (including the first render)
  // Don't be tempted to make useEffect async console will scream at you
  useEffect(() => {
    // Async calls are to be made inside useEffect then immediately called below
    (async function getWelcome() {
      try {
        const welcomeServer = await DungeonService.getWelcome();
        setWelcome(welcomeServer);
      } catch (error) {
        console.error(error);
      }
    }());
    // Array at the end is requried to avoid looping
    // indicates that this is only triggered on mount
    // if we put [propVariable] inside it would trigger again on propVariable change
    // See https://www.robinwieruch.de/react-hooks-fetch-data/ for indepth material
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <h3>{ welcome }</h3>
        </Link>
        <Spacer />
        { user && <IconButton><Avatar alt={user.name} src={user.photo} /></IconButton> }
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
