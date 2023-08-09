'use client'
// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchUser } from './userSlice';
import { useEffect } from 'react';

const UserView = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])
    
  return (
    <div>

        <h1>UserDetails</h1>
        <p>First name: firstname </p>
        <p>Last name: lastname </p>
        <p>Email: email </p>
        <p>token: token </p>
        {user.loading && <div>Loading ...</div>}
        {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
        {!user.loading && user.users.length ? (
            <ul>
                {
                   user.users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                   ))
                }
            </ul>
        ) : null }
    </div>
  )
}


export default UserView;