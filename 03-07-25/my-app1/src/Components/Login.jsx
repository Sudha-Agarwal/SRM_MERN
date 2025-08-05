import React, {useState} from "react";
import { useAuth } from "./useContext/authContext";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [formData, setFormData] = useState({name:'', email:''});
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        login(formData);
        //can call api to verify login
        navigate('/') //redirects after login
    }

    return(
        <div>
            <h2>Login</h2>
             <form onSubmit={handleSubmit}>
            <div>               
                <input type="text" placeholder="Enter name" value={formData.name} onChange={handleChange} name="name"/>
            </div>

            <div>
                <input type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} name="email"/>
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    )



}

export default Login;