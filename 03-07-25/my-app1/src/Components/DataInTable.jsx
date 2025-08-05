import React, { useState, useEffect} from'react';
import { useAuth } from './useContext/authContext';
import { Navigate } from 'react-router-dom';

const DataInTable = ()=>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const {isLoggedIn} = useAuth();
    //const navigate = useNavigate();

    //Redirect if not Logged in
   
    useEffect(()=>{
        const fetchData = async ()=>{
        try{
            //Fetch data from JSONPlaceHolder API

            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');

            if(!response.ok){
                throw new Error("Failed to fetch data")
            }

            //Parse response data
            const data = await response.json();
            setData(data);
            console.log(data);
            setError(null);
        }
        catch(error){
            setError(error);
            setData(null);
        }
    };
    fetchData();    
    },[]);

    if(!isLoggedIn){
        //alert("User is not looged in")
        return <Navigate to = "/login"/>
    }
    return(
        <div>
            <h2>Data Fetched</h2>
            {error && <p>Error: {error}</p>}
            {data && (
                <table className = "table table-primary table-striped" border="1" cellPadding="10" cellSpacing="0">
                    <thead className="table-dark">
                        <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(items=>(
                            <tr key={items.id}>
                                <td>{items.id}</td>
                                <td>{items.title}</td>
                                <td>{items.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}            
        </div>
    )}
export default DataInTable;