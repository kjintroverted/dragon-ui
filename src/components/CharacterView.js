import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import CharacterBackground from './CharacterBackground';

function CharacterView({ character }) {
  return (
        <CharacterBackground character={character} />
  );
}

export default CharacterView;
