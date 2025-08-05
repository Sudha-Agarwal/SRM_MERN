import React, { useState} from 'react';

function RegisterationForm(){
    //Initial Form State

    const [formData, setFormData] = useState({
        username:'',
        password:'',
        gender:'',
        terms:false
    });
    const [error, setError] = useState({});

    const handleChange = (e)=>{
        console.log(e.target);
        const {name, value, type, checked} = e.target;
        setFormData(prev =>({...prev,
            [name]:type === "checkbox"?checked:value}))
    }   

    //Handle Form submit
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(validate()){
            console.log(`form submitted:`,formData)
            //Make a POST request
            try{
                const response = await fetch('http://localhost:3000/users/signup',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                const data = await response.json();

                if(data.success){
                    alert("success")
                }
            }
            catch(error){
                console.log("error:", error)
            }
        }
        
    }
    //Validation Function
    const validate = () =>{
        const newError = {};

        if(!formData.username.trim()){
            newError.username = "User name is required";
        }
        else if(formData.username.trim().length <3){
            newError.username = "User name must be atleast 3 characters";            
        }
        if(!formData.password){
            newError.password = "Password is required"
        }
        else if(formData.password.length <6){
            newError.password = "Password must be atleast 6 characters"
        }

        if(!formData.gender){
            newError.gender = "Please select your gender";
        }
        if(!formData.terms){
            newError.terms = "you must accept terms and conditions";
        }
        setError(newError);
        
        //return true if no errors
        return Object.keys(newError).length === 0;

    }

    return(
        <form onSubmit = {handleSubmit} noValidate>
            <div>
                <input type="text" name="username" onChange={handleChange} value={formData.username}/>
                {error.username && <p style={{color:'red'}}>{error.username}</p>}
                
            </div>
            <div>
                <input type="password" name="password" onChange={handleChange} value={formData.password}/>
                {error.password && <p style={{color:'red'}}>{error.password}</p>}               
            </div>
            <div>
                <select name='gender' value={formData.gender} onChange={handleChange} required>
                    <option value=''>Select gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>                    
                </select>  
                {error.gender && <p style={{color:'red'}}>{error.gender}</p>}          
            </div>
            <div>
                <input type="checkbox" name="terms"
                checked = {formData.terms} onChange={handleChange}/>
                {error.terms && <p style={{color:'red'}}>{error.terms}</p>}
            </div>
             <button type="submit">Submit</button>
        </form>
    )
}

export default RegisterationForm;

