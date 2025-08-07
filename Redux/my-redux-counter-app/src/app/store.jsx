import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/CounterSlice';
import { thunk } from 'redux-thunk';
import usersReducer from '../features/users/usersSlice';


const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: usersReducer
    },
   // middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

export default store;