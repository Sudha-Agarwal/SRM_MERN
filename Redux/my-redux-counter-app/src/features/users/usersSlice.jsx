import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

//Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async()=>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

const usersSlice = createSlice({
    name:'users',
    initialState:{
        data:[],
        status:'idle',
        error:null
    },
    reducers:{}
});

export default usersSlice.reducer;