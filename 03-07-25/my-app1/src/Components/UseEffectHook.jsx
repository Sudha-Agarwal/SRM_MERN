import React, {useEffect, useState} from 'react';

const UseEffectHook = ()=>{
    const [count, setCount] = useState(0);

    //useEffect is called after the component renders
    useEffect(()=>{
        console.log("initial render")
    },[])//empty dependency array means this effect runs only once after the initial render

    useEffect(()=>{
        console.log("count changed")
    },[count])

    return(
        <div><p>Use effect hook</p>
        <p>Count: {count}</p>
        <button onClick={()=>setCount(count+1)}>Increment</button>
        </div>
    )
}

export default UseEffectHook;