import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DungeonService from '../services/dungeonService';
import CharacterBackground from './CharacterBackground';

function OwnerView({ owner }) {
  const [characters, updateCharacters] = useState([]);

  useEffect(() => {
    (async function getCharactersByOwner() {
      const characterList = await DungeonService.getCharactersByOwner(owner);
      updateCharacters(characterList);
    }());
  }, []);

  const characterCards = [];
  characters.forEach((character) => {
    characterCards.push(<CharacterBackground character={character} key={character.id} />);
  });

  return (
    <Container>
      { characterCards }
    </Container>
  );
}

export default OwnerView;

OwnerView.propTypes = {
  owner: PropTypes.string.isRequired,
};

const Container = styled.div`
    display:flex;
`;
