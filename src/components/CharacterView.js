import React, { useState, useEffect } from 'react';

import dungeonService from '../services/dungeonService';

function CharacterView({ location }) {
  const [character, setCharacter] = useState(location.state || {});

  useEffect(() => {
    if (!character.name) {
      console.log('No character provided. Loading character from ID.');
      (async function loadCharacter() {
        const id = location.search.split('id=')[1];
        const c = await dungeonService.getCharacter(id);
        setCharacter(c);
      }());
    }
  }, []);

  return <p>{ character.name }</p>;
}

export default CharacterView;
