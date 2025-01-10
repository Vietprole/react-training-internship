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
        <div>
          <NoteBox />
        </div>
      </div>
    </div>
  );
}

export default App;
