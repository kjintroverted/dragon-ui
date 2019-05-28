
const getWelcome = async () => {
  const result = await fetch('/api');
  return result.text();
};

const getCharacters = async () => {
  const result = await fetch('/api/characters');
  return result.text();
};

export default {
  getCharacters,
  getWelcome,
};
