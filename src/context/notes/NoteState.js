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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjZTAxZDY5YmM4MjhiODI2OTU0OGNiIn0sImlhdCI6MTY0MTIwNjgwMn0.F01VlF33AktkUSlbGT_SFPy7T9mM0U6X68bUdQcsZmc",
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjZTAxZDY5YmM4MjhiODI2OTU0OGNiIn0sImlhdCI6MTY0MTIwNjgwMn0.F01VlF33AktkUSlbGT_SFPy7T9mM0U6X68bUdQcsZmc",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    const note = {
      _id: "61d48906d8526345900f401b8e",
      user: "61ce01d69bc828b8269548cb",
      title: title,
      description: description,
      tag: tag,
      date: "2022-01-04T17:51:02.453Z",
      __v: 0,
    };
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjZTAxZDY5YmM4MjhiODI2OTU0OGNiIn0sImlhdCI6MTY0MTIwNjgwMn0.F01VlF33AktkUSlbGT_SFPy7T9mM0U6X68bUdQcsZmc",
      }
    });
    console.log("deleting the note with id" + id);
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjZTAxZDY5YmM4MjhiODI2OTU0OGNiIn0sImlhdCI6MTY0MTIwNjgwMn0.F01VlF33AktkUSlbGT_SFPy7T9mM0U6X68bUdQcsZmc",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    // logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      const e = notes[i];
      if (e === id) {
        e.title = title;
        e.description = description;
        e.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
