import React from 'react';

const SimpleFunctionalComponent = ({name, age}) =>{
    return(
        <div>
            <h2>Simple Functional Component</h2>
            <p>Props value: {name} {age}</p>
        </div>
    )
}

export default SimpleFunctionalComponent;