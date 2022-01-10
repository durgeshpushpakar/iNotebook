import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
export const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
    // const [disabled, setDisabled] = useState(true);
    let navigate=useNavigate();
    const handleSubmit = async (e) => {
        const {name, password, email, cpassword}=credentials;
        if(cpassword!==password){
            alert("password do not match");
        }
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        });
        const json=await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        }
        else{
            alert("Some error occured");
        }        
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }
    return (
        <div className="container">
            <h1 className="mb-4">Sign Up on iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="text" name="name" value={credentials.name} className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" value={credentials.email} className="form-control" id="email" onChange={onChange} aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" value={credentials.password} className="form-control" id="password" onChange={onChange} minLength={5} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" value={credentials.cpassword} className="form-control" id="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
