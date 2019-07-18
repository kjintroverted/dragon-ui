import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fab } from '@material-ui/core';
import DungeonService from '../services/dungeonService';
import Attributes from './Attributes';
import Vitals from './Vitals';
import { SideBar, SideBarToggle } from './CustomStyled';
import CharacterSummary from './CharacterSummary';

function CharacterView({ location }) {
  const [sidebar, setSidebar] = useState(false);
  const [idList, setIDList] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [focus, setFocus] = useState({});

  function getCharacter(id) {
    return characters.find(c => c.id === id);
  }

  useEffect(() => {
    const ids = location.search.split('id=')[1].split(',');
    setIDList(ids);
    const socket = DungeonService.watchCharacters(ids);
    socket.onmessage = event => setCharacters(JSON.parse(event.data));

    return () => socket.close();
  }, []);

  useEffect(() => {
    const id = !focus ? idList[0] : focus.id || idList[0];
    if (!id) return;
    setFocus(getCharacter(id));
  }, [characters, idList]);

  if (!focus) return null;

  return (
    <div>
      <h2>{ focus.name }</h2>
      <p>{ focus.race } { focus.class }</p>
      <CharacterSheet>
        <Attributes character={focus} />
        <Vitals character={focus} />
      </CharacterSheet>
      <SideBar className={sidebar ? 'open' : ''}>
        {
          characters.map(character => (
            <CharacterSummary
              key={character.id}
              character={character}
              open={() => setFocus(character)}
              highlight={focus.id === character.id}
            />
          ))
        }
      </SideBar>
      {
        !!characters.length
        && <SideBarToggle>
          <Fab color="secondary" onClick={() => setSidebar(!sidebar)}>
            <i className="material-icons">{ sidebar ? 'close' : 'group' }</i>
          </Fab>
           </SideBarToggle>
      }
    </div>
  );
}

CharacterView.propTypes = {
  location: PropTypes.object.isRequired,
};

const CharacterSheet = styled.div`
    display:flex;
`;

export default CharacterView;
