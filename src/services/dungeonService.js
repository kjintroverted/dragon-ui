
// WILL NEED TO BE DYNAMIC BY ENV
const serverDomain = process.env.REACT_APP_API_DOMAIN || 'localhost:80';

const getWelcome = async () => {
  const result = await fetch(`http://${serverDomain}/api`);
  return result.text();
};

const getCharacter = async (characterId = '') => {
  console.log('here');
  const result = await fetch(`http://${serverDomain}/api/data/pc/${characterId}`);
  return result.json();
};

const checkUserAuth = async (characterId, user) => {
  const result = await fetch(`http://${serverDomain}/api/characters/${characterId}/auth-users?user=${user}`);
  return result.json();
};

const saveCharacter = async (character) => {
  try {
    await fetch(`http://${serverDomain}/api/characters`,
      {
        method: 'POST',
        body: JSON.stringify(character),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

const watchCharacters = characterIds => new WebSocket(`ws://${serverDomain}/api/characters?id=${characterIds.join()}&watch=true`);

const getCharactersByOwner = async () => {
  const result = await fetch(`http://${serverDomain}/api/data/pc`);
  return result.json();
};

const getLevelInfo = async (xp) => {
  const result = await fetch(`http://${serverDomain}/api/level?xp=${xp}`);
  return result.json();
};

const getRaces = async () => {
  const result = await fetch(`http://${serverDomain}/api/races`);
  return result.json();
};

const getClasses = async () => {
  const result = await fetch(`http://${serverDomain}/api/classes`);
  return result.json();
};

const getClass = async (name) => {
  const result = await fetch(`http://${serverDomain}/api/classes?name=${name}`);
  return result.json();
};

const getRace = async (name) => {
  const result = await fetch(`http://${serverDomain}/api/races?name=${name}`);
  return result.json();
};

const getWeapons = async () => {
  const result = await fetch(`http://${serverDomain}/api/weapons`);
  return result.json();
};

const getSpells = async (slugs) => {
  const result = await fetch(`http://${serverDomain}/api/spells?name=${slugs.join()}`);
  return result.json();
};

const getSpellsForLevel = async (level) => {
  const result = await fetch(`http://${serverDomain}/api/spells?level=${level}`);
  return result.json();
};

const getFeats = async (ids) => {
  const query = !ids ? '' : `?id=${ids.join()}`;
  const result = await fetch(`http://${serverDomain}/api/feats${query}`);
  return result.json();
};

export default {
  getCharacter,
  saveCharacter,
  watchCharacters,
  getCharactersByOwner,
  getWelcome,
  getLevelInfo,
  checkUserAuth,
  getRaces,
  getClasses,
  getClass,
  getRace,
  getWeapons,
  getSpells,
  getSpellsForLevel,
  getFeats,
};
