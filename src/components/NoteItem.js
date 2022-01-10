import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";
export default function NoteItem(props) {
    const context=useContext(noteContext);
    const {deleteNote, editNote}=context;
  const { note, updateNote, showAlert } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>        
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);showAlert("deleted successfully", "success")}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{updateNote(note);}}></i>
        </div>
      </div>
    </div>
  );
}
