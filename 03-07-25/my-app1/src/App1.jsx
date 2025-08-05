import React from 'react';
import { BrowserRouter as Router,Route, Link, Routes, BrowserRouter } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Counter from './Components/Counter';
import SimpleFunctionalComponent from './Components/SimpleFunctionalComponent';
import RegisterationForm from './Components/RegisterationForm';
import SearchUser from './Components/SearchUser';
import UseReducerHook from './Components/UseReducerHook';
import TodoApp from './Components/TodoApp';
import UseReducerForm from './Components/UseReducerForm';
import UseContextHook from './Components/UseContextHook';
import { AuthProvider, useAuth } from './Components/useContext/authContext';

const Navbar = ()=>{
    const {isLoggedIn, user, login,logout} = useAuth();
    const handleLogin = ()=>{
        login({name:'Sudha',email:'sudha@gmail.com'})
    }
    
}
const App1 = () =>{
    const userInfo = {
    name:'Sudha',
    email:'sudha@gmail.com'
  }
    return(
        <BrowserRouter>
            <nav>
                <Link to='/'>Home</Link> | {' '}
                <Link to='/counter'>Counter</Link> | {' '}                
                <Link to='/functional-comp'>Functional Component</Link> | {' '}
                <Link to='/register'>Sign Up</Link> | {' '}
                <Link to='/search-user'>Search User</Link> | {' '}
                <Link to='/reducer-hook'>Reducer Hook</Link> | {' '}
                <Link to='/todo'>Todo</Link> | {' '}
                <Link to='/reducer-form'>Reducer Form</Link> | {' '}
                <Link to='/use-context'>Use Context</Link> | {' '}
            </nav>
            <Routes>
                {/*Define routes */}
                <Route path='/' element={<Welcome user={userInfo}/>} />
                 <Route path='/counter' element={<Counter />} />
                 <Route path='/functional-comp' element={<SimpleFunctionalComponent />} />
                 <Route path='/register' element={<RegisterationForm />} />
                 <Route path='/search-user' element={<SearchUser />} />
                 <Route path='/reducer-hook' element={<UseReducerHook />} />
                 <Route path='/todo' element={<TodoApp />} />
                 <Route path='/reducer-form' element={<UseReducerForm />} />
                  <Route path='/use-context' element={<UseContextHook />} />
            </Routes>
        </BrowserRouter>

    )

}

export default App1;