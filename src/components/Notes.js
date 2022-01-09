import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
export default function Notes() {
    // getting all notes using context api hook 
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const [note, setNote] = useState({title:"", description:"", tag:""});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("updating the note to", note)
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
    <>
      <AddNote />

      {/* MODAL  */}
      
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
     </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

                <form>
                    <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                    </div>
                </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>


        {/* User's notes  */}
      <div className="row">
        <h2 className="my-3">Your Notes</h2>
        {notes.map((e) => {
            return <NoteItem key={e._id} updateNote={updateNote} note={e} />;
        })}
      </div>
    </>
  );
}
