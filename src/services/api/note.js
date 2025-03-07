import { API_URL } from "../config";
import toast from "react-hot-toast";

const getNotes = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/notes?userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      toast.error(parsedResponse);
    }

    return parsedResponse;
  } catch (error) {
    console.log(error);
    // Add id to prevent duplicate
    toast.error("Failed to fetch notes", { id: "getNotesError" });
  }
};

const getNoteById = async (noteId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      toast.error(parsedResponse);
    }

    return parsedResponse;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch note with id: " + noteId, {
      id: "getNoteByIdError",
    });
  }
};

const createNote = async (note) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      toast.error(parsedResponse);
      return parsedResponse;
    }

    toast.success("Note created successfully", { id: "createNoteSuccess" });
    return parsedResponse;
  } catch (error) {
    console.log(error);
    toast.error("Failed to create note", { id: "createNoteError" });
  }
};

const updateNote = async (noteId, note) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      toast.error(parsedResponse);
      return parsedResponse;
    }

    toast.success("Note updated successfully", { id: "updateNoteSuccess" });
    return parsedResponse;
  } catch (error) {
    console.log(error);
    toast.error("Failed to update note", { id: "updateNoteError" });
  }
};

const deleteNote = async (noteId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      toast.error(parsedResponse);
      return parsedResponse;
    }

    toast.success("Note deleted successfully", { id: "deleteNoteSuccess" });
    return parsedResponse;
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete note", { id: "deleteNoteError" });
  }
};

export { getNotes, getNoteById, createNote, updateNote, deleteNote };
