import React from 'react';
import NoteItem from './NoteItem';

const NotesList = ({ notes, getNote, setToggle, deleteNote }) => {
  return (
    <div className="notes-container">
      {notes &&
        notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            getNote={getNote}
            toggleModal={setToggle}
            deleteNote={deleteNote}
          />
        ))}
    </div>
  );
};

export default NotesList;