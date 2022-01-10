import React from 'react'

export default function Alert(props) {
  let capitalize=(word)=>{
      if(word==="danger")word="error";
        return word.charAt(0).toUppercase() + word.slice(1);
    }
    return (
        props.alert && <div>
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{ props.alert.type }</strong> : {props.alert.msg}
            </div>    
        </div>
    )
}
