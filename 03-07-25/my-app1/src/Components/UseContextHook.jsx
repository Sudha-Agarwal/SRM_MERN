import React, {createContext, useContext} from "react";

//step1: create a context
const myContext = createContext();

//Step2: Create a provider component
const MyProvider = ({children})=>{
    const sharedValue = "Hello from Context";

    return <myContext.Provider value={sharedValue}>{children}</myContext.Provider>
}
//Step3: Consume the context using useContext
const MyComponent = ()=>{
    const contextValue = useContext(myContext);
    return(
        <div>
            <p>Context Value:{contextValue}</p>
        </div>
    )
}
const MyComponent1 = ()=>{
    const contextValue = useContext(myContext);
    return(
        <div>
            <p>Context Value in Child1:{contextValue}</p>
        </div>
    )
}

const UseContextHook = ()=>{
    return(
        <MyProvider>
            <div>
                <MyComponent />
                    <MyComponent1 />    
            </div>
        </MyProvider>
    )

}

export default UseContextHook;