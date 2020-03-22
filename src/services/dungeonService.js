const serverDomain = process.env.REACT_APP_API_DOMAIN || 'http://localhost:80';

const getWelcome = async () => {
  const result = await fetch(`${serverDomain}/api`);
  return result.text();
};

const getBackgrounds = async () => {
  const result = await fetch(`${serverDomain}/api/bg`);
  return result.json();
};

const getCharacter = async (characterId = '') => {
  const result = await fetch(`${serverDomain}/api/data/pc/${characterId}?detail=true`);
  return result.json();
};

const checkUserAuth = async (characterId, user) => {
  const result = await fetch(`${serverDomain}/api/characters/${characterId}/auth-users?user=${user}`);
  return result.json();
};

const saveCharacter = async (character) => {
  console.log(character);
  try {
    // await fetch(`${serverDomain}/api/data/pc`,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(character.info),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

const watchCharacters = characterIds => new WebSocket(`ws://${serverDomain}/api/characters?id=${characterIds.join()}&watch=true`);

const getCharactersByOwner = async () => {
  const result = await fetch(`${serverDomain}/api/data/pc?detail=true`);
  return result.json();
};

const getLevelInfo = async (xp) => {
  const result = await fetch(`${serverDomain}/api/level?xp=${xp}`);
  return result.json();
};

const getRaces = async () => {
  const result = await fetch(`${serverDomain}/api/races`);
  return result.json();
};

const getClasses = async () => {
  const result = await fetch(`${serverDomain}/api/classes`);
  return result.json();
};

const getClass = async (id) => {
  const result = await fetch(`${serverDomain}/api/classes/${id}`);
  return result.json();
};

const getRace = async (id) => {
  const result = await fetch(`${serverDomain}/api/races/${id}`);
  return result.json();
};

const getWeapons = async () => {
  const result = await fetch(`${serverDomain}/api/items?type=weapon`);
  return result.json();
};

const getItems = async () => {
  const result = await fetch(`${serverDomain}/api/items`);
  return result.json();
};

const getSpells = async (slugs) => {
  const result = await fetch(`${serverDomain}/api/spells?name=${slugs.join()}`);
  return result.json();
};

const getSpellsForLevel = async (level) => {
  const result = await fetch(`${serverDomain}/api/spells?level=${level}`);
  return result.json();
};

const getFeats = async (ids) => {
  const query = !ids ? '' : `?id=${ids.join()}`;
  const result = await fetch(`${serverDomain}/api/feats${query}`);
  return result.json();
};

export default {
  checkUserAuth,
  getBackgrounds,
  getCharacter,
  getCharactersByOwner,
  getClass,
  getClasses,
  getFeats,
  getItems,
  getRaces,
  getRace,
  getSpells,
  getLevelInfo,
  getSpellsForLevel,
  getWeapons,
  getWelcome,
  saveCharacter,
  watchCharacters,
};
