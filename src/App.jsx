import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import NoteBox from "./components/note-box/NoteBox";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div>TODO: Implement search bar</div>
        <h1><span>Hello, </span><span className="name">Ruy</span>! 👋🏼</h1>
        <p className="description">All your notes are here, in one place!</p>
        <div className="notes-container">
          <NoteBox />
          <NoteBox
            content="This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍"
            createdAt={new Date("2025-01-13T01:43:59.140Z")}
            variant="secondary"
          />
          <NoteBox
            content="This is a very long line of text that should make 5 lines in the note box. This is a very long note. Let's see if it works! 🤞🏼. Make this note even longer. Even longer note. Even longer note."
            createdAt={new Date("2025-01-13T01:43:59.140Z")}
            variant="tertiary"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
