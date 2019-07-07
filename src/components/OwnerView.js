import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CharacterBackground from './CharacterBackground';
import CharacterView from './CharacterView';
import DungeonService from '../services/dungeonService';

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
    // characterCards.push(<CharacterBackground character={character} key={character.id} />);
  });

  return (
    <Container>
{ characters.length > 0 && <CharacterView character={characters[0]} />
}
      {/* { characterCards } */}
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
