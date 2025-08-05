import { useState } from 'react'
import './App.css'
import Welcome from './Components/Welcome';
import Counter from './Components/Counter';
import ClassLifeCycleMethods from './Components/ClassLifeCycleMethods';
import SimpleFunctionalComponent from './Components/SimpleFunctionalComponent';
import UseStateHook from './Components/UseStateHook';
import UseStateHookForm from './Components/UseStateHookForm';
import UserProfile from './Components/StateAsObject';
import RegisterationForm from './Components/RegisterationForm';
import UseEffectHook from './Components/UseEffectHook';
import DataFetchingComponent from './Components/DataFetchingComponent';
import DataInTable from './Components/DataInTable';

function App() {
  const [count, setCount] = useState(0)
  const userInfo = {
    name:'Sudha',
    email:'sudha@gmail.com'
  }

  return (
    <>
   <div>Hello World</div> 
   <Welcome user={userInfo}/>  
   <Counter />
   <ClassLifeCycleMethods />
   <SimpleFunctionalComponent name="sudha" age={30}/>
   <UseStateHook />
   <UseStateHookForm />
   <UserProfile />
   <RegisterationForm />
   <UseEffectHook />
   <DataFetchingComponent />
   <DataInTable />
   </>
  )
}

export default App
