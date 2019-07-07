import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import CharacterBackground from './CharacterBackground';
import Vitals from './Vitals';

function CharacterView({ character }) {
  console.log(character);
  if (character) { return null; }
  return (
      <div>
        <CharacterBackground character={character} />
        <Vitals chracter={character} />
      </div>
  );
}

export default CharacterView;
