import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "61d48906d856345900f40b8e",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.453Z",
          "__v": 0
        },
        {
          "_id": "61d48906d856345900f40b90",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.586Z",
          "__v": 0
        },
        {
          "_id": "61d48906d856345900f40b8e",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.453Z",
          "__v": 0
        },
        {
          "_id": "61d48906d856345900f40b90",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.586Z",
          "__v": 0
        },
        {
          "_id": "61d48906d856345900f40b8e",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.453Z",
          "__v": 0
        },
        {
          "_id": "61d48906d856345900f40b90",
          "user": "61ce01d69bc828b8269548cb",
          "title": "new Note",
          "description": "Work hard everyday",
          "tag": "personal",
          "date": "2022-01-04T17:51:02.586Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;
