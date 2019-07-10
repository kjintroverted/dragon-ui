import React, { useState, useEffect } from 'react';

import dungeonService from '../services/dungeonService';

function CharacterView({ location }) {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    const id = location.search.split('id=')[1];
    const socket = dungeonService.watchCharacter(id);
    socket.onopen = () => console.log('Socket open');
    socket.onmessage = event => setCharacter(JSON.parse(event.data));
  }, []);

  return <p>{ character.name } has { character.hp } hit points</p>;
}

export default CharacterView;
