
const getWelcome = async () => {
  const result = await fetch('/api');
  return result.text();
};

const getCharacter = async (characterId = '') => {
  const result = await fetch(`/api/characters/${characterId}`);
  return result.json();
};

export default {
  getCharacter,
  getWelcome,
};
