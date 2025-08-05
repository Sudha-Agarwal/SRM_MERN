import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = ()=>{
    const {id} = useParams(); //gets the :id from URL
    const [post,setPost] = useState(null);
    const [error, setError] = useState('');

    useEffect(()=>{
        const fetchPost = async()=>{
            try{
                const response = await fetch(`http://localhost:3000/posts/${id}`);

            if(!response.ok) throw new Error('Failed to fetch post');
            const data = await response.json();
            setPost(data);

            }
            catch(err){
                setError(err)
                alert(err)
            }
            
        };
        fetchPost();
    },[id])    

return(
    <div>    
        {error && <p>Error:{error}</p>}
        {post && (
            <div>
            <h2>Post Details</h2>
            <p>ID:{post._id}</p>
             <p>Title:{post.title}</p>
              <p>Body:{post.body}</p>
              </div>
        ) }
        </div>    
)
}
export default PostDetails;