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
    throw new Error(error || 'Failed to fetch notes');
  }

  return response.json();
};

const getNoteById = async (token, noteId) => {
  const response = await fetch(`${API_URL}/notes/${noteId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error || 'Failed to fetch notes');
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
    body: JSON.stringify(note)
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error || 'Failed to create note');
  }

  return response.json();
}

const updateNote = async (token, noteId, note) => {
  const response = await fetch(`${API_URL}/notes/${noteId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error || 'Failed to update note');
  }

  return response.json();
}

const deleteNote = async (token, noteId) => {
  const response = await fetch(`${API_URL}/notes/${noteId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error || 'Failed to delete note');
  }

  return response.json();
}


export { getNotes, getNoteById, createNote, updateNote, deleteNote };
