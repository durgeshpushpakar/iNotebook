import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "61d48906d8526345900f40b8e",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.453Z",
          "__v": 0
        },
        {
          "_id": "61d4890226d856345900f40b90",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.586Z",
          "__v": 0
        },
        {
          "_id": "61d48906d8563459002f40b8e",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.453Z",
          "__v": 0
        },
        {
          "_id": "61d48906d856345900f4022b90",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.586Z",
          "__v": 0
        },
        {
          "_id": "61d48906d85632245900f40b8e",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.453Z",
          "__v": 0
        },
        {
          "_id": "61d48906d856345900f4220b90",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.586Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInitial);
    //add a note
    const addNote = (title, description, tag) => {
		// TODO: API CALL  
		console.log("adding a new note");
		const note={
			"_id": "61d48906d8526345900f401b8e",
			"user": "61ce01d69bc828b8269548cb",
			"title": title,
			"description": description,
			"tag": tag,
			"date": "2022-01-04T17:51:02.453Z",
			"__v": 0
		}
		setNotes(notes.concat(note));
	}

    // delete a note
    const deleteNote = () => {
      
    }

    // Edit Note
    const editNote = () => {
      
    }
    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;
