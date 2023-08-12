import { toast } from 'react-toastify';

export function notesMockCRUD(setNotes, setNote, setToggle, setInputs) {
  const getNotes = () => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data.notes))
      .catch((error) => console.log('Error fetching notes', error));
  };
  const getNote = (id) => {
    fetch(`/api/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNote(data.notes);
        setToggle(true);
      })
      .catch((error) => console.log('Note not found', error));
  };
  const addNote = (title, body) => {
    if (!title || !body) {
      toast.error('Please fill all the required input fields');
      return;
    }
    fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((res) => {
        console.log(res.json());
        getNotes();
        setToggle(false);
        setInputs({ title: '', body: '' });
        toast.success('Note added successfully');
      })
      .catch((error) => {
        console.log('Error adding note.', error);
        toast.error('Error adding note.');
      });
  };

  const updateNote = (id, title, body) => {
    if (!title || !body) {
      toast.error('Please fill all the required input fields');
      return;
    }
    fetch(`/api/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((res) => {
        getNotes();
        setToggle(false);
        toast.success('Note updated successfully.');
      })
      .catch((error) => {
        console.log('Note not found', error);
        toast.error('Error updating note.');
      });
  };

  const deleteNote = (id) => {
    fetch(`/api/notes/${id}`, { method: 'DELETE' })
      .then((res) => {
        getNotes();
        toast.success('Note deleted successfully');
      })
      .catch((error) => {
        console.log('Note not found', error);
        toast.error('Error deleting note.');
      });
  };

  const handleAdd = () => {
    setInputs({ title: '', body: '' });
    setNote([]);
    setToggle(true);
  };
  return { getNotes, handleAdd, getNote, deleteNote, addNote, updateNote };
}
