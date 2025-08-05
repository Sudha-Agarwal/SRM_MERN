import react, { useReducer, userReducer } from 'react';

const initialState = {count:0};

const counterReducer = (state, action)=>{
    switch(action.type){
        case 'increment':
            return {count: state.count+1};
        case 'decrement':
            return {count: state.count-1};
        case 'reset':
            return {count:0}
        default:
            return state;
    }
}
const UseReducerHook = ()=>{
    const [state,dispatch] = useReducer(counterReducer, initialState);

    return(
        <div>
            <h2>Use Reducer</h2>
            <p>Count: {state.count}</p>
            <button onClick={()=>dispatch({type:'increment'})}>Increment</button>
            <button onClick={()=>dispatch({type:'decrement'})}>Decrement</button>
            <button onClick={()=>dispatch({type:'reset'})}>Reset</button>
        </div>
    )


}

export default UseReducerHook;