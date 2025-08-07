import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { increment, decrement, reset } from './CounterSlice';

const Counter = () =>{
    const count = useSelector((state) =>state.counter.count);
    const dispatch = useDispatch();

    return(
        <div style={{textAlign:'center'}}>
            <h1>Redux Counter: {count}</h1>
            <button on onClick={()=>dispatch(increment())}>Increment</button>
            <button on onClick={()=>dispatch(decrement())}>Decrement</button>
            <button on onClick={()=>dispatch(reset())}>Reset</button>
        </div>
    )
}

export default Counter;