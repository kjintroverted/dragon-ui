import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000/';

// Should work as soon as the server allows cross origin requests
const getWelcome = () => {
  return axios.get(BASE_URL);
};

export default {
  getWelcome,
};
