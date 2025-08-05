import React, { useState} from 'react';

const UseStateHookForm = () =>{
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert(user);
        alert(email);        
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your name' onChange={(event)=>{setUser(event.target.value)}} value={user}/>   

                 <input type="text" placeholder='Enter your email' onChange={(event)=>{setEmail(event.target.value)}} value={email}/>   
                <button type="submit">Submit</button>             
            </form>
        </div>
    )
}

export default UseStateHookForm;