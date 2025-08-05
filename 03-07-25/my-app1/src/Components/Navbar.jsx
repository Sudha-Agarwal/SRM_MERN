import React from "react";
import { useAuth } from "./useContext/authContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ()=>{
    //consume the context
    const {isLoggedIn, user, login,logout} = useAuth();
    const navigate = useNavigate();
    const handleLogin = ()=>{
        navigate('/login');      

    }

    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }
    
    return (
        <nav>
                <Link to='/'>Home</Link> | {' '}
                <Link to='/counter'>Counter</Link> | {' '}                
                <Link to='/functional-comp'>Functional Component</Link> | {' '}
                <Link to='/register'>Sign Up</Link> | {' '}
                <Link to='/search-user'>Search User</Link> | {' '}
                <Link to='/reducer-hook'>Reducer Hook</Link> | {' '}
                <Link to='/todo'>Todo</Link> | {' '}
                <Link to='/reducer-form'>Reducer Form</Link> | {' '}
                <Link to='/use-context'>Use Context1</Link> | {' '}
                <Link to='/posts'>Posts</Link> | {' '}
                <Link to='/users/101'>User</Link> | {' '}
                <Link to='/editable-table'>Editable table</Link> | {' '}
            {isLoggedIn?(
                <>
                <span style={{marginLeft:'20px'}}>Hi {user.name}</span>
                <button onClick={handleLogout}>Logout</button>
                </>
            ):(
                <>
                <button onClick={handleLogin}>Login</button>
                </>
            )}
            </nav>
    )
    
}

export default Navbar;