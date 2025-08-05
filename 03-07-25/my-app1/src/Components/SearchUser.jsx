import React, { useState} from 'react';

const SearchUser = ()=>{
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async ()=>{
        if(!email.trim()){
            setError("Please enter an email");
            setUser(null);
            return
        }
        try{
            const response = await fetch(`http://localhost:3000/users/search?email=${encodeURIComponent(email)}`);

            const data = await response.json();

            if(response.ok){
                setUser(data);
                setError('');
            }
            else{
                setUser(null);
                setError(data.message || "User not found")
            }
        }
        catch(error){
            setError(error);
            setUser(null);
        }
    };

    return(
        <div style={{padding: '20px'}}>
            <h2>Search User by Email</h2>
            <input type="email" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />

            <button onClick={handleSearch}>Search</button>
            {error && <p style={{color:'red'}}>{error}</p> }

            {user && (
                <div style={{margin: '20px', border: '1px solid black', padding: '10px'}}>
                    <h3>User Details</h3>
                    <p>Name:{user.name}</p>
                    <p>Email:{user.email}</p>
                    <p>Age:{user.age}</p>
                    </div>
            )}
        </div>
    );
}

export default SearchUser;