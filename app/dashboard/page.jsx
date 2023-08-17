'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

function getUser(){
  let user = localStorage.getItem('user'); 
  if(user){
      user = JSON.parse(user); 
  } else {
      user = null
  }
  return user; 
}

function Dashboard() {

  const [user, setUser] = useState(getUser());

  const navigate = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null)
        navigate.push('/login');
    }
  
  


  

  return (
    <>
      {user ? (
        <>
          <h2>Welcome to your dashboard</h2>
          <h4>Hello, {user.firstName} {user.lastName}</h4>
          <h5>{user.email}</h5>
          <button className='bg-red-500 text-white rounded-md' onClick={handleLogout}>LOGOUT</button>
        </>
      ) : (
        <div className='flex justify-center items-center h-[100vh]'>
          <p> You are not Logged In </p>
          <Link href='/sign-in' className='ml-2'><button className='bg-blue-500 text-white rounded-md px-2'>LOGIN</button></Link>
        </div>
      )}
    </>

  )
}

export default Dashboard