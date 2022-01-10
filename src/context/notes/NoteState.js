import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);


//get all notes
const getNotes = async () => {
	// API CALL
	const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const json = await response.json();
	// console.log(json);
	setNotes(json);
};




  //add a note
const addNote = async (title, description, tag) => {
    // TODO: API CALL
	const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
};

  // delete a note
  const deleteNote = async (id) => {
    // TODO: API CALL
	const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      }
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({title, description, tag})
    });
    // const json = response.json();
	let newNotes= JSON.parse(JSON.stringify(notes));
    // logic to edit in client side
    for (let i = 0; i < newNotes.length; i++) {
      const e = newNotes[i];
      if (e._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
		break;
      }
    }
	setNotes(newNotes);
  }
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
