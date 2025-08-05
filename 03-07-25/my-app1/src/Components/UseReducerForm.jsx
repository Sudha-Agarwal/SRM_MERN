import React, { useReducer} from 'react';

//Reducer Function
const formReducer = (state,action)=>{
    switch(action.type){
        case 'SET_FIELD':
            return{...state, [action.field]:action.value}
        case 'RESET':
            return {firstName:'', lastName:'', email:''}
        default:
            return state;
    }
}

const UseReducerForm = ()=>{
    //useReducer returns [state, dispatch]
    const[formData, dispatch] = useReducer(formReducer, {
        firstName:'',
        lastName:'',
        email: ''
    });

    const handleInputChange = (field, value)=>{
        dispatch({type:'SET_FIELD',field,value})
    }
    const handleFormReset = ()=>{
        dispatch({type:'RESET'})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(`Form Data: ${formData.firstName}`)

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name = "firstName" value={formData.firstName}
                onChange={(e)=>handleInputChange('firstName', e.target.value)} />

            <input type='text' name = "lastName" value={formData.lastName}
                onChange={(e)=>handleInputChange('lastName', e.target.value)} />

                <input type='text' name = "email" value={formData.email}
                onChange={(e)=>handleInputChange('email', e.target.value)} />

                <button onClick={handleFormReset}>Reset</button>
                <button type="submit">Submit</button>

            </form>
        </div>
    )

}

export default UseReducerForm;