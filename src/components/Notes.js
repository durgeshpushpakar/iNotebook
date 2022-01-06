import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
export default function Notes() {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div className="row">
            <h2 className="my-3">Your Notes</h2>
            {notes.map((e) => {
                return <NoteItem note={e}/>
            })
            }
        </div>
    )
}
