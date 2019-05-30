import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DungeonService from '../services/dungeonService';

function CharacterBackground() {
  // Hard Coded for quick development
  // Also linting disabled until we add a way to grab the ID
  // eslint-disable-next-line
  const [characterId, updateCharacterId] = useState('6oHp62hgG0zeFPjwa8RB');
  const [characterInfo, updateCharacterInfo] = useState({});

  useEffect(() => {
    (async function getCharacterData() {
      try {
        const characterData = await DungeonService.getCharacter(characterId);
        updateCharacterInfo(characterData);
      } catch (error) {
        console.error(error);
      }
    }());
  }, []);

  return (
      <Container>
        { characterInfo && <div className="name">{ characterInfo.name }</div> }
        { characterInfo && <div className="name">{ `${characterInfo.name} test` }</div> }
      </Container>
  );
}

export default CharacterBackground;

const Container = styled.div`
  display: flex;
  & .name {
    padding: 1em;
  }
`;
