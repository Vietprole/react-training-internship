import { API_URL } from '../config';

const getNotes = async (token, userId) => {
  const response = await fetch(`${API_URL}/notes?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch notes');
  }

  return response.json();
};

const createNote = async (token, note) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create note');
  }
}


export { getNotes, createNote };
