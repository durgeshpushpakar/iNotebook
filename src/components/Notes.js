import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';
export default function Notes() {
    const context = useContext(noteContext);
    const { notes, addNote, getNotes } = context;
    useEffect(()=>{
        getNotes();
    }, []);
    return (
        <>
        <AddNote/>
        <div className="row">
            <h2 className="my-3">Your Notes</h2>
            {notes.map((e) => {
                return <NoteItem key={e._id} note={e}/>
            })
            }
        </div>
        </>
    )
}
