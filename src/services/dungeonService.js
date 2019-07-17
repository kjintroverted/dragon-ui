
// WILL NEED TO BE DYNAMIC BY ENV
const serverDomain = 'localhost:4000';

const getWelcome = async () => {
  const result = await fetch('/api');
  return result.text();
};

const getCharacter = async (characterId = '') => {
  const result = await fetch(`/api/characters/${characterId}`);
  return result.json();
};

const watchCharacter = characterId => new WebSocket(`ws://${serverDomain}/api/characters/${characterId}?watch=true`);

const getCharactersByOwner = async (owner = 'clayton.yarborough@gmail.com') => {
  const result = await fetch(`/api/characters?owner=${owner}`);
  return result.json();
};

const getLevelInfo = async (xp) => {
  const result = await fetch(`/api/level?xp=${xp}`);
  return result.json();
};

export default {
  getCharacter,
  watchCharacter,
  getCharactersByOwner,
  getWelcome,
  getLevelInfo,
};
