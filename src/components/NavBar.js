import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";

import { Avatar, IconButton } from "@material-ui/core";
import { Spacer } from "./CustomStyled";

function NavBar({ user }) {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Link to='/'>
          <h3>Dungeon</h3>
        </Link>
        <Spacer />
        {user && (
          <IconButton>
            <Avatar alt={user.name} src={user.photo} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
