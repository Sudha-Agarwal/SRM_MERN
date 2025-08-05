import React, { useState, useEffect} from'react';

const DataFetchingComponent = ()=>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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

    return(
        <div>
            <h2>Data Fetched</h2>
            {error && <p>Error: {error}</p>}
            {data && (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}            
        </div>
    )}
export default DataFetchingComponent;