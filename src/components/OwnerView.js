import React, { useState, useEffect } from 'react';

import DungeonService from '../services/dungeonService';
import CharacterBackground from './CharacterBackground';

function OwnerView() {
  const [characters, updateCharacters] = useState([]);
  // needs to be passed in later
  const [owner, updateOwner] = useState();
  useEffect(() => {
    (async function getCharactersByOwner() {
      const characterList = await DungeonService.getCharactersByOwner(owner);
      updateCharacters(characterList);
    }());
  }, [owner]);

  const characterCards = [];
  characters.forEach((character) => {
    characterCards.push(<CharacterBackground character={character} key={character.id} />);
  });

  return (
      <div>
          {characterCards}
      </div>
  );
}

export default OwnerView;

// TODO: Add styling
