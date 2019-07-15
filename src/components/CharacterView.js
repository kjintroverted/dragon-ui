import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import DungeonService from '../services/dungeonService';
import Attributes from './Attributes';
import CharacterBackground from './CharacterBackground';
import Vitals from './Vitals';

function CharacterView({ location }) {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    const id = location.search.split('id=')[1];
    const socket = DungeonService.watchCharacter(id);
    socket.onmessage = event => setCharacter(JSON.parse(event.data));

    return () => {
      socket.close();
    };
  }, []);

  if (!character) {
    return null;
  }

  return (
    <div>
      <CharacterBackground character={character} />
      <CharacterSheet>
        <Attributes character={character} />
        <Vitals character={character} />
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
