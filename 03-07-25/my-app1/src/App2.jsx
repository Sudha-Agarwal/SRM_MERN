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
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import DataInTable from './Components/DataInTable';
import UserProfile from './Components/UserProfile';
import EditableTableData from './Components/EditableTableData';
import PostDetails from './Components/PostDetails';

const App2 = () =>{
    //const {user} = useAuth();
    const userInfo = {
    name:'sudha',
    email:'sudha@gmail.com'
  }
    return(
        <AuthProvider>
        <BrowserRouter>
            {/*<nav>
                <Link to='/'>Home</Link> | {' '}
                <Link to='/counter'>Counter</Link> | {' '}                
                <Link to='/functional-comp'>Functional Component</Link> | {' '}
                <Link to='/register'>Sign Up</Link> | {' '}
                <Link to='/search-user'>Search User</Link> | {' '}
                <Link to='/reducer-hook'>Reducer Hook</Link> | {' '}
                <Link to='/todo'>Todo</Link> | {' '}
                <Link to='/reducer-form'>Reducer Form</Link> | {' '}
                <Link to='/use-context'>Use Context</Link> | {' '}
            </nav>*/}

            <Navbar />
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
                  <Route path='/login' element={<Login />} />
                  <Route path='/posts' element={<DataInTable />} />
                  <Route path='/users/:id' element={<UserProfile />} />
                  <Route path='/editable-table' element={<EditableTableData />} />
                  <Route path='/posts/:id' element={<PostDetails />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>

    )

}

export default App2;

