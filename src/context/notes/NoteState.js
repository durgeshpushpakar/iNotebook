import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const s1={
        "name":"Durgesh",
        "class":"12 A"
    }
    const [state, setstate] = useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setstate({
                "name":"Nothing",
                "class":"hacked"
            })
        }, 1000)
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;
