import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import Attributes from './Attributes';
import CharacterBackground from './CharacterBackground';
import Vitals from './Vitals';

function CharacterView({ character }) {
  console.log(character);
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

const CharacterSheet = styled.div`
    display:flex;
`;

export default CharacterView;
