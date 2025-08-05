import React, {useState} from 'react';

//Functional component
const UseStateHook = ()=>{
    //declare a state variable named count and initialize it to 0
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Sudha');

    const handleIncrement = () =>{
        setCount(count+1);
        setName('Sudha1')
    }
    
    return(
        <div>
            <p>Use state hook</p>
        <p>Count: {count}</p>
        <p>Name: {name}</p>
        {/*Button to increment count*/}
        <button onClick={handleIncrement}>Increment</button>
          <button onClick={()=>setCount(count-1)}>Decrement</button>
          <button onClick={()=>setCount(0)}>Reset</button>
        </div>
    )
}
export default UseStateHook;




