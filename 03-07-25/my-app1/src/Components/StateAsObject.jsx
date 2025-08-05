import React, { useState} from 'react';

function UserProfile(){
    //declare a state as object with name and age

    const [user, setUser] = useState({name:'',age:0});

    //Function to update name only
    const updateName = ()=>{
        setUser(prev=> ({...prev, name:"Sudha"}))
    }

    //Function to update age
    const updateAge = () =>{
        setUser(prev=>({...prev, age:prev.age+1}));
    }

    return(
        <div>
            <h2>User profile</h2>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>

            <button onClick={updateName}>Set Name</button>
            <button onClick={updateAge}>Set Age</button>
        </div>
    )

}

export default UserProfile;
