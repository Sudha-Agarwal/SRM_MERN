import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./usersSlice";

const UsersList = ()=>{
    const dispatch = useDispatch();

    const users = useSelector((state)=>state.users.data);

    useEffect(()=>{
        dispatch(fetchUsers());
    },[dispatch])

    return(
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map((user)=>(
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default UsersList;