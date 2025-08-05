import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useContext/authContext';

const EditableTableData = ()=>{
    const [data,setData] = useState([]);
    const [error, setError] = useState(null);

    const [editRowId, setEditRowId] = useState(null);
    const [editFormData, setEditFormData] = useState({title:'',body:''});
    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();

    //Redirect if not logged in
    useEffect(()=>{
        if(!isLoggedIn){
            navigate('/login');
        }
    },[isLoggedIn,navigate]);

    //Fetch data
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch('http://localhost:3000/posts');

                if(!response.ok) throw new Error("Failed to fetch data");

                const result = await response.json();
                console.log(result);

                setData(result);
                setError(null);
            }
            catch(error){
                setError(error.message);
                setData([]);
            }
        }
        fetchData();
    },[]);

    const handleEditClick = (item)=>{
        setEditRowId(item._id);
        setEditFormData({title:item.title,body:item.body})

    }
    //Handle input change in editable fields
    const handleEditChange = (e)=>{
        const{name, value} = e.target;
        setEditFormData(prev=>({...prev,[name]:value}));
    }

    const handleSaveClick = async(_id)=>{
        try{
            const response = await fetch(`http://localhost:3000/posts/${_id}`,{
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(editFormData)
            })
            if(!response.ok) throw new Error("failed to update");
            const updatedItem = await response.json();
            //update local state
            const updatedData = data.map(item=>
                item._id===_id ? {...item,...updatedItem}:item
            )
            setData(updatedData)
            alert("Record updated")
            setEditRowId(null)
        }
        catch(error){
            console.log(error);
            setError(error);
            alert('Update failed')
        }
    }
    
    const handleDeleteClick = async(_id)=>{
        try{
            const response = await fetch(`http://localhost:3000/posts/${_id}`,{
                method:'DELETE'
            });
            if(!response.ok) throw new Error("Failed to delete from server");

            //Remove from local state only if backend delete is successful
            const updatedData = data.filter(item=>item._id!==_id);
            setData(updatedData);
            alert("Deleted successfully from server")
        }
        catch(err){
            alert(err);

        }
    }

    return(
        <div>
            <h2>Editable table</h2>
            {error && <p>Error: {error}</p>}
            {data.length >0 && (
                <table className='table table-striped bordered'>
                    <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item=>(
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                {editRowId === item._id?(
                                    <>
                                    <td>
                                        <input type="text" name="title" value={editFormData.title}
                                        onChange={handleEditChange} />
                                    </td>
                                    <td>
                                        <textarea name="body"
                                        value={editFormData.body}
                                        onChange={handleEditChange}
                                        row="3"
                                        cols="30" />
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td></>
                                )}  
                                
                                <td>
                                    {editRowId===item._id? (
                                        <button className='btn btn-primary m-2' onClick={()=>handleSaveClick(item._id)}>Save</button>
                                    ):(<button className='btn btn-primary m-2' onClick={()=>handleEditClick(item)}>Edit</button>)}                                    
                                <button className='btn btn-primary m-2' onClick={()=>handleDeleteClick(item._id)}>Delete</button>
                                <button className='btn btn-primary m-2' onClick={(e)=>{
                                    e.stopPropagation();
                                    navigate(`/posts/${item._id}`)
                                }}>Details</button>
                                
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        
    )


}

export default EditableTableData;