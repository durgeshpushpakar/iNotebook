import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password:""});
    let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json=await response.json()
        console.log(json);
        if(json.success){
            // save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        }
        else{
            alert("Enter correct credentials");
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" value={credentials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" value={credentials.password} className="form-control" id="exampleInputPassword1" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
