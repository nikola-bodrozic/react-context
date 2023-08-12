import React, { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotesList from './comp/NotesList';
import Form from './comp/Form';
import "./App.css";
import AddUser from "./comp/AddUser";
import Header from "./comp/Header";

import { UserProvider } from "./context/UsersContext";
import RenderExcel from './comp/RenderExcel';
import { notesMockCRUD } from './notesMockCRUD';

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [inputs, setInputs] = useState({ title: '', body: '' });
  const [toggle, setToggle] = useState(false);

  const { getNotes, handleAdd, getNote, deleteNote, addNote, updateNote } = notesMockCRUD(setNotes, setNote, setToggle, setInputs);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="App">
      <div className="card">
        <header className="header">
          <h1 className="header__title">Notes</h1>
          <button className="btn" onClick={handleAdd}>
            Add Note <IoAdd className="btn__icon" size="24" />
          </button>
        </header>
        <NotesList
          notes={notes}
          getNote={getNote}
          setToggle={setToggle}
          deleteNote={deleteNote}
        />
        <Form
          showModal={toggle}
          note={note}
          toggleModal={setToggle}
          addNote={addNote}
          updateNote={updateNote}
          inputs={inputs}
          setInputs={setInputs}
        />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
        />
      </div>
      <UserProvider>
        <Header />
        <AddUser />
      </UserProvider>
      <RenderExcel />
    </div>
  );
}

export default App;


