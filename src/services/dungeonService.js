
const getWelcome = async () => {
  const result = await fetch('/api');
  return result.text();
};

// TODO: Convert getCharacters to conditionally add the characterId
const getCharacter = async (characterId) => {
  const result = await fetch(`/api/characters/${characterId}`);
  return result.text();
};

const getCharacters = async () => {
  const result = await fetch('/api/characters');
  return result.text();
};


export default {
  getCharacter,
  getCharacters,
  getWelcome,
};
