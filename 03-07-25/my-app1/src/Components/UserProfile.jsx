import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = ()=>{
    const {id} = useParams();
    return (
        <div>
            <h2>User profile</h2>
            <p>User Id: {id}</p>
        </div>
    )
}

export default UserProfile;