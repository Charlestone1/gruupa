'use client'
import {useState} from 'react'
import Logo from '@/components/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLeftCircle } from 'react-icons/ai'
import { HiOutlineUserCircle, HiOutlineMail, HiOutlineKey } from 'react-icons/hi'
import {MdOutlineVisibility, MdOutlineVisibilityOff} from "react-icons/md"
import {RiErrorWarningLine} from "react-icons/ri"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { loginUser } from '@/app/redux/features/user/userSlice';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    // const [formData, setFormData] = useState(
    //     {
    //     email: "", 
    //     password: ""
    //     }
    // )

    // redux state 
    const {loading, error} = useSelector((state) => state.user)

    const navigate = useRouter();
    const dispatch = useDispatch(); 


    // function handleChange(event) {
    //     const {name, value} = event.target
    //     setFormData(prevFormData => {
    //         return {
    //             ...prevFormData,
    //             [name]: value
    //         }
    //     })
    // }

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        let userCredentials = { 
            email, password
        }
        // try {
        //     const data = dispatch().unwrap()
        // } catch (error) {
            
        // }
        dispatch(loginUser(userCredentials)).then((result) => {
            if (result.payload) {
                setEmail('');
                setPassword('');
                navigate.push('/dashboard');
            }
        })
        // .catch((error) => {
        //     console.log(error)
        // })
       
      }
      

  return (
    <section className="md:w-screen md:h-screen flex justify-center items-center">
            <div className='flex items-center justify-center w-full h-full p-3'>
                <div className='flex items-center justify-center w-[90%] md:w-[38%] h-full'>
                    <form onSubmit={handleSubmit} className='flex justify-center h-full w-80'>
                        <div className='flex flex-col items-center w-full '>
                            
                            <div className=' flex justify-center items-center pt-2 pb-5'>
                                <Logo /> 
                                <h3 className='pl-2 font-semibold text-lg'>TeamUp</h3>
                            </div>
                            <div className='text-center flex flex-col items-center'>
                                <p className=' text-2xl font-semibold'>Welcome back!</p>
                                <p className='text-primary text-sm font-extralight pt-1'>Login to your account</p>
                            </div>
                            
                            {error &&
                            <p className="text-md h-1 text-red-500 font-bold flex justify-center items-center mt-4">
                            <span className="mr-1 font-normal"><RiErrorWarningLine /></span>{error}</p>}
                            <div className='flex flex-col justify-between items-center py-5 w-full'>
                                <div className='w-full'>
                                    <label htmlFor="email" className="block mb-1 text-sm font-semibold text-[#241E4E] ">Email </label>
                                    <div className='relative'>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            placeholder="Enter your email address" 
                                            // placeholder="example@gmail.com" 
                                            required
                                            value={email} 
                                            // value={formData.email} 
                                            // onChange={handleChange} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            className="bg-gray-50 border border-gray-400 outline-1 outline-[#A396FF] text-gray-800 sm:text-sm rounded-full focus:ring-[#A396FF] focus:border-[#A396FF] block w-full h-10 pl-8 bg-transparent "/>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineMail />
                                            </span>
                                    </div>
                                </div>

                                <div className='w-full py-5'>
                                    <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-900 ">Password </label>
                                    <div className="relative">
                                        <input 
                                            type={isPasswordVisible ? "text" : "password"}
                                            name="password" 
                                            id="password" 
                                            placeholder="••••••••" 
                                            required 
                                            autoComplete="off"
                                            value={password} 
                                            // value={formData.password} 
                                            // onChange={handleChange}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-full focus:ring-primary focus:border-primary block w-full h-10 pl-8 bg-transparent" />
                                            <span className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                            onClick={togglePasswordVisibility}>
                                            {isPasswordVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                                            </span>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineKey />
                                            </span>
                                    </div>
                                </div>

                                <div className='text-sm flex justify-between w-full'>
                                    <span className='flex items-center'>
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember" className='pl-2'>Remember me</label>
                                    </span>
                                    <Link href='/recover-password'>Forgot password?</Link>
                                </div>
                            </div>

                            
                            <span className='w-full'>
                                <button className='rounded-full bg-primary w-full text-white text-sm h-10 tracking-wide'>
                                {loading ? 
                                <Loader/> 
                                : "Continue"}
                                </button>
                            </span>
                            <p className='pt-5 text-gray-400 text-sm font-extralight'>Don’t have an account?  <Link href='/sign-up' className='text-gray-600 font-semibold'>Sign up</Link> </p>
                        </div>
                    </form>
                </div>

                <div className='hidden md:flex justify-center items-center w-[62%] h-full '>
                    <div className=' flex justify-center items-center h-full w-full rounded-l-[70px] bg-primary overflow-hidden'>
                        Image
                    </div>
                </div>
            </div>
        </section>
  )
}

export default SignIn