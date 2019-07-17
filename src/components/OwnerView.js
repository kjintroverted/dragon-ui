import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CharacterSummary from './CharacterSummary';
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
    characterCards.push(
      <Link
        to={{
          pathname: '/character',
          search: `?id=${character.id}`,
          state: character,
        }}
        key={character.id}
      >
        <CharacterSummary character={character} />
      </Link>,
    );
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
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 10px;
    justify-content: center;
`;
