import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import NoteBox from "./components/note-box/NoteBox";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const VARIANTS = ["primary", "secondary", "tertiary"];

function getRandomVariant(prevVariant) {
  const availableVariants = VARIANTS.filter(variant => variant !== prevVariant);
  const randomIndex = Math.floor(Math.random() * availableVariants.length);
  return availableVariants[randomIndex];
}

function getNotes(){
  const storedNotes = localStorage.getItem('notes');
  if (!storedNotes) return [];

  const parsedNotes = JSON.parse(storedNotes);
  // Convert string back to Date object
  return parsedNotes.map(note => ({
    ...note,
    createdAt: new Date(note.createdAt)
  }));
}

function App() {
  const [notes, setNotes] = useState(getNotes());

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = () => {
    const prevNote = notes[notes.length - 1];
    const prevVariant = prevNote?.variant;

    const newNote = {
      id: uuidv4(),
      content: '',
      createdAt: new Date(),
      variant: getRandomVariant(prevVariant),
    };
    setNotes([...notes, newNote]);
  }

  const handleNoteChange = (id, newContent) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, content: newContent } : note
    ));
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  }

  return (
    <div className="App">
      <Sidebar handleCreateNote={handleCreateNote}/>
      <div className="main">
        <div>TODO: Implement search bar</div>
        <h1><span>Hello, </span><span className="name">Ruy</span>! 👋🏼</h1>
        <p className="description">All your notes are here, in one place!</p>
        <div className="notes-container">
          {notes.map((note) => (
            <NoteBox
              key={note.id}
              content={note.content}
              createdAt={note.createdAt}
              variant={note.variant}
              onSaveChanges={(content) => handleNoteChange(note.id, content)}
              handleEmptyNote={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
