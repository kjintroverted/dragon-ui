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
  }, [characterId]);

  return (
      <Container>
          { characterInfo.name && <div className="attribute"> Name: <h4> {characterInfo.name} </h4> </div> }
          { characterInfo.race && <div className="attribute">Race: <h4> {characterInfo.race} </h4></div> }
          { characterInfo.class && <div className="attribute"> Class: <h4> {characterInfo.class} </h4></div> }
      </Container>
  );
}

export default CharacterBackground;

const Container = styled.div`
  background: white;
  border-radius: 5px;
  border-style: solid;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 8px;
  color: grey;
  display: flex;
  margin: 1em;
  padding: 10px;
  position: relative;
  & .attribute {
    color:black;
    padding: 1em;
  }
`;
