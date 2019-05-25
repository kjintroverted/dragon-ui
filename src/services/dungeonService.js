const getWelcome = async () => {
  const result = await fetch('/api');
  return result.text();
};

export default {
  getWelcome,
};
