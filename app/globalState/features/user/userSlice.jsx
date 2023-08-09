'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loading: false, 
    users: [], 
    error: ''
}
// return axios.get('https://jsonplaceholder.typicode.com/users')
// .then(response => response.data)

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    return axios.post('https://web-view-kaq9.onrender.com/api/v1/auth/login')
    .then(response => response.json())
    .then(data => {
        
    })
}) 

const userSlice = createSlice({
    name: 'user', 
    initialState, 
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer