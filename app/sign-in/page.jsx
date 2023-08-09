'use client'
import {useState} from 'react'
import Logo from '@/components/Logo';
import { AiOutlineLeftCircle } from 'react-icons/ai'
import { HiOutlineUserCircle, HiOutlineMail, HiOutlineKey } from 'react-icons/hi'
import {MdOutlineVisibility, MdOutlineVisibilityOff} from "react-icons/md"
import {RiErrorWarningLine} from "react-icons/ri"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { useUserContext } from '../useContexGlobal/UserContext'


const SignIn = () => {
    const { setUser } = useUserContext();
    const [loading, setLoading] = useState(false); 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [success, setSuccess] = useState(false)
    const [verifyMsg, setVerifyMsg] = useState(null)
    const [loginError, setLoginError] = useState(null);
    const [formData, setFormData] = useState(
        {
        email: "", 
        password: ""
        }
    )

    const navigate = useRouter();


    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        if (loginError) {
            setLoginError(null)
        }
        if (verifyMsg) {
            setVerifyMsg(null)
        }

        // change password type back to password if on type="text".
        if (isPasswordVisible === true) {
          setIsPasswordVisible(false)
        }
    
        // Check if the user is connected to the internet
        if (!navigator.onLine) {
          setLoading(false);
          setLoginError("Please check your internet connection.");
          return;
        }
    
        fetch('https://web-view-kaq9.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data.message === "Verify your email address") {
                setVerifyMsg(data.message)
                setLoading(false);
                return
            }
            
          if (data.message === 'Login successfully') {

              // Save the token and login data to useContext
              //   setUser(data);
              
              // Save the token and login data to localStorage
            //   localStorage.setItem('user', data);
              localStorage.setItem('token', data.token);
              localStorage.setItem('email', data.data.email);
              localStorage.setItem('firstname', data.data.firstName);
              localStorage.setItem('lastname', data.data.lastName);

              // Redirect to dashboard on successful login.
              navigate.push('/dashboard');

            setFormData({
              email: "",
              password: ""
            });
          } 
          
        })
        .catch(error => {
        //   console.log(error)
          setLoading(false);
    
        //   // Set error message on failed login
        //   setLoginError(error.message);
          setLoginError("Invalid Credentials");
        });
       
      }
      

  return (
    <section className="md:w-screen md:h-screen flex justify-center items-center">
            <div className='flex items-center justify-center w-full h-full p-3'>
                <div className='flex items-center justify-center w-[38%] h-full'>
                    <form onSubmit={handleSubmit} className='flex justify-center h-full w-80'>
                        <div className='flex flex-col items-center w-full '>
                            
                            <div className=' flex justify-center items-center pt-2 pb-5'>
                                <Logo /> 
                                <h3 className='pl-2 font-semibold'>TeamUp</h3>
                            </div>
                            <div className='text-center flex flex-col items-center'>
                                <p className=' text-2xl font-semibold'>Welcome back!</p>
                                <p className='text-primary text-xs font-extralight pt-1'>Login to your account</p>
                            </div>
                            {verifyMsg === null ? null :
                            <p className="text-xs h-1 text-yellow-600 font-bold flex justify-center items-center mt-4">
                            <span className="mr-1 font-normal"><RiErrorWarningLine /></span>{verifyMsg}</p>}
                            {loginError === null ? null :
                            <p className="text-xs h-1 text-red-500 font-bold flex justify-center items-center mt-4">
                            <span className="mr-1 font-normal"><RiErrorWarningLine /></span>{loginError}</p>}
                            <div className='flex flex-col justify-between items-center py-5 w-full'>
                                <div className='w-full'>
                                    <label htmlFor="email" className="block mb-1 text-xs font-semibold text-[#241E4E] ">Email </label>
                                    <div className='relative'>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            placeholder="Enter your email address" 
                                            // placeholder="example@gmail.com" 
                                            required
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            className="bg-gray-50 border border-gray-400 outline-1 outline-[#A396FF] text-gray-800 sm:text-sm rounded-full focus:ring-[#A396FF] focus:border-[#A396FF] block w-full h-9 pl-8 bg-transparent "/>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineMail />
                                            </span>
                                    </div>
                                </div>

                                <div className='w-full py-5'>
                                    <label htmlFor="password" className="block mb-1 text-xs font-semibold text-gray-900 ">Password </label>
                                    <div className="relative">
                                        <input 
                                            type={isPasswordVisible ? "text" : "password"}
                                            name="password" 
                                            id="password" 
                                            placeholder="••••••••" 
                                            required 
                                            autoComplete="off"
                                            value={formData.password} 
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-full focus:ring-primary focus:border-primary block w-full h-9 pl-8 bg-transparent" />
                                            <span className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                            onClick={togglePasswordVisibility}>
                                            {isPasswordVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                                            </span>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineKey />
                                            </span>
                                    </div>
                                </div>

                                <div className='text-xs flex justify-between w-full'>
                                    <span className='flex items-center'>
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember" className='pl-2'>Remember me</label>
                                    </span>
                                    <Link href='/recover-password'>Forgot password?</Link>
                                </div>
                            </div>

                            
                            <span className='w-full border'>
                                <button className='rounded-full bg-primary w-full text-white text-sm h-10 tracking-wide'>
                                {loading ? 
                                <Loader/> 
                                : "Continue"}
                                </button>
                            </span>
                            <p className='pt-5 text-gray-400 text-xs font-extralight'>Don’t have an account?  <Link href='/sign-up' className='text-gray-600 font-semibold'>Sign up</Link> </p>
                        </div>
                    </form>
                </div>

                <div className='flex justify-center items-center w-[62%] h-full '>
                    <div className=' flex justify-center items-center h-full w-full rounded-l-[70px] bg-primary overflow-hidden'>
                        Image
                    </div>
                </div>
            </div>
        </section>
  )
}

export default SignIn