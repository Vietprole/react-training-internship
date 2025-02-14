import { API_URL } from '../config';

const authAPI = {
  login: async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log(response);
    return response.json();
  },

  signup: async (userData) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log(response);
    return response.json();
  },
};

export default authAPI;
