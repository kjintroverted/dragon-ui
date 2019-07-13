
const getWelcome = async () => {
  const result = await fetch('/api');
  return result.text();
};

const getCharacter = async (characterId = '') => {
  const result = await fetch(`/api/characters/${characterId}`);
  return result.json();
};


const getCharactersByOwner = async (owner = 'clayton.yarborough@gmail.com') => {
  const result = await fetch(`/api/characters?owner=${owner}`);
  return result.json();
};

export default {
  getCharacter,
  getCharactersByOwner,
  getWelcome,
};
