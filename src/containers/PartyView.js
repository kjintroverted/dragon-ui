import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import DungeonService from '../services/dungeonService';
import {
  SideBar, SideBarToggle, ContentWithSideBar, RowCenter,
} from '../components/CustomStyled';
import CharacterSummary from '../components/CharacterSummary';
import CharacterSheet from '../components/CharacterSheet';

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
    socket.onmessage = (event) => {
      const updatedCharacters = JSON.parse(event.data).sort((a, b) => {
        if (!a.initiative) {
          if (!b.initiative) return 0;
          return 1;
        }
        if (!b.initiative) return -1;
        return b.initiative - a.initiative;
      });
      setCharacters(updatedCharacters);
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    const id = !focus ? idList[0] : focus.id || idList[0];
    if (!id) return;
    setFocus(getCharacter(id));
  }, [characters, idList]);

  if (!focus) return null;

  return (
    <ContentWithSideBar>
      <RowCenter>
        <CharacterSheet characterData={focus} />
      </RowCenter>
      {
        characters.length > 1
        && <>
          <SideBar className={sidebar ? 'open' : ''}>
            {
              characters
                .map(character => (
                  <CharacterSummary
                    key={character.id}
                    character={character}
                    open={() => setFocus(character)}
                    highlight={focus.id === character.id}
                  />
                ))
            }
          </SideBar>
          <SideBarToggle>
            <Fab color="secondary" onClick={() => setSidebar(!sidebar)}>
              <i className="material-icons">{ sidebar ? 'close' : 'group' }</i>
            </Fab>
          </SideBarToggle>
           </>
      }
    </ContentWithSideBar>
  );
}

CharacterView.propTypes = {
  location: PropTypes.object.isRequired,
};


export default CharacterView;
