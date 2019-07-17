import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CharacterSummary from './CharacterSummary';
import DungeonService from '../services/dungeonService';

function OwnerView({ owner }) {
  const [characters, updateCharacters] = useState([]);
  const [party, updateParty] = useState([]);

  function toggleCharacter(id) {
    const i = party.indexOf(id);
    if (i !== -1) updateParty([...party.slice(0, i), ...party.slice(i + 1)]);
    else updateParty([...party, id]);
  }

  useEffect(() => {
    (async function getCharactersByOwner() {
      let characterList = await DungeonService.getCharactersByOwner(owner);
      characterList = await Promise.all(characterList.map(async (character) => {
        const level = await DungeonService.getLevelInfo(character.xp);
        return { ...character, ...level };
      }));
      updateCharacters(characterList);
    }());
  }, []);

  const characterCards = [];
  characters.forEach((character) => {
    characterCards.push(
      <CharacterSummary
        key={character.id}
        character={character}
        highlight={party.indexOf(character.id) != -1}
        add={() => toggleCharacter(character.id)}
        linkTo={`/character?id=${character.id}`}
      />,
    );
  });

  return (
    <Container>
      { characterCards }
      { !!party.length
        && <BottomAnchor>
          <Link to={`/character?id=${party.join()}`} style={{ zIndex: 10 }}>
            <Fab color="secondary">
              <i className="material-icons">group</i>
            </Fab>
          </Link>
           </BottomAnchor>
      }
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
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 10px;
    justify-content: center;
`;

const BottomAnchor = styled.span`
  position: fixed;
  bottom: 5px;
  right: 5px;
`;
