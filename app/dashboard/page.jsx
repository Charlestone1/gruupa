'use client'
import React, {useState, useEffect} from 'react'
// import { useUserContext } from '../useContexGlobal/UserContext';

function Dashboard() {
  // const firstname = localStorage.getItem('firstname');
  // const lastname = localStorage.getItem('lastname');
  // const emailAddress = localStorage.getItem('email');
  // const myToken = localStorage.getItem('token');

  const [firstName, setFirstName] = useState(localStorage.getItem('firstname'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastname'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // const { user } = useUserContext();

  // console.log(user);
  // console.log(firstName);
  // console.log(lastName);
  // console.log(email);
  // console.log(token);



  return (
    <div className='flex flex-col justify-center items-center bg-primary text-sm'>        
        {token ? ( // Check if userdata is not null
        <>
          <h1 className='text-lg'>Welcome to your Dashboard</h1>
          <h2>Hello {firstName} {lastName}</h2>
          <h3 className='py-2 underline'>User Details</h3>
          <p>First name: {firstName}</p>
          <p>Last name: {lastName}</p>
          <p>Email: {email}</p>
          {/* <p>Login token: {token}</p> */}
        </>
      ) : (
        <p>You are not logged In.</p>
      )}
    </div>
  )
}

export default Dashboard