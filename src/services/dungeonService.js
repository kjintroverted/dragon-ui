
const getWelcome = async () => {
  const result = await fetch('/api');
  return result.text();
};

const getCharacter = async (characterId = '') => {
  const result = await fetch(`/api/characters/${characterId}`);
  return result.json();
};

const watchCharacter = characterId => new WebSocket(`ws://localhost:4000/api/characters/${characterId}?watch=true`);

const getCharactersByOwner = async (owner = 'clayton.yarborough@gmail.com') => {
  const result = await fetch(`/api/characters?owner=${owner}`);
  console.log(result);
  return result.json();
};

export default {
  getCharacter,
  watchCharacter,
  getCharactersByOwner,
  getWelcome,
};
