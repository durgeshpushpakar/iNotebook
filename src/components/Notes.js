import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
export default function Notes(props) {
  // getting all notes using context api hook 
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("updated successfully", "success")
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value});
    }
    return (
    <>
      <AddNote showAlert={props.showAlert}/>

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
                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                    </div>
                </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>


        {/* User's notes  */}
      <div className="row">
        <h2 className="my-3 container">Your Notes</h2>
        {notes.length===0 && 'No Notes to display'}
        {notes.map((e) => {
            return <NoteItem key={e._id} updateNote={updateNote} note={e} showAlert={props.showAlert}/>;
        })}
      </div>
    </>
  );
}
