const getWelcome = async () => {
  var result = await fetch("/api");
  return result.text();
};

export default {
  getWelcome
};
