import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import DungeonService from '../services/dungeonService';
import Attributes from './Attributes';
import Vitals from './Vitals';

function CharacterView({ location }) {
  const [idList, setIDList] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [focus, setFocus] = useState({});

  function updateCharacter(id) {
    return (data) => {
      const i = characters.findIndex(c => c.id === id);
      setCharacters([...characters.slice(0, i), data, ...characters.slice(i + 1)]);
    };
  }

  function getCharacter(id) {
    return characters.find(c => c.id === id);
  }

  useEffect(() => {
    const ids = location.search.split('id=')[1].split(',');
    setIDList(ids);
    let sockets = [];
    ids.forEach((id) => {
      const socket = DungeonService.watchCharacter(id);
      const update = updateCharacter(id);
      socket.onmessage = event => update(JSON.parse(event.data));
      sockets = [...sockets, socket];
    });

    return () => sockets.forEach(s => s.close());
  }, []);

  useEffect(() => {
    if (!focus) return;
    const id = focus.id || idList[0];
    if (!id) return;
    setFocus(getCharacter(id));
  }, [characters]);

  if (!focus || !focus.id) return null;

  return (
    <div>
      <h2>{ focus.name }</h2>
      <p>{ focus.race } { focus.class }</p>
      <CharacterSheet>
        <Attributes character={ focus } />
        <Vitals character={ focus } />
      </CharacterSheet>
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
