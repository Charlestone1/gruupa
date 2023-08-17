'use client'
import {useState} from 'react'
import Logo from '@/components/Logo';
import { AiOutlineLeftCircle } from 'react-icons/ai'
import { HiOutlineUserCircle, HiOutlineMail, HiOutlineKey } from 'react-icons/hi'
import {MdOutlineVisibility, MdOutlineVisibilityOff} from "react-icons/md"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';


const SignUp = () => {
    const [loading, setLoading] = useState(false); 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState(
        {
            firstName: "", 
            lastName: "", 
            email: "", 
            password: ""
        }
      )

      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    
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

      const getStrengthLevel = () => {
            if (formData.password.length >= 8 && formData.password.match(passwordRegex)) {
            return <span className="text-gray-600 font-semibold">Password Strength:
                    <span className="text-green-400 font-semibold ml-1">Strong</span>
                </span>;
            } else if (formData.password.length >= 8) {
            return <span className="text-gray-600 font-semibold">
                Password Strength: 
                <span className="text-yellow-600 font-semibold ml-1">Medium</span>
                </span>;
            } else if (formData.password.length >= 1) {
            return <span className="text-gray-600 font-semibold">Password Strength:
                <span className="text-red-600 font-semibold ml-1">Weak</span>
                </span>;
            } else {
                return
            }
        }

      function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        console.log(formData);

        if (isPasswordVisible === true) {
            setIsPasswordVisible(false)
        }
        fetch('https://web-view-kaq9.onrender.com/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          navigate.push('/confirm-password');

          setFormData({
            firstName: "", 
            lastName: "", 
            email: "", 
            password: ""
          });

          setLoading(false);
        //   setSuccess(true);
        //   setTimeout(() => {
        //     setSuccess(false);
        //   }, 3000);
        })
        .catch(error => {
            console.error(error)
            setLoading(false);
        }
        );
      }

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
      }

  return (
    <section className="md:w-screen md:h-screen flex justify-center items-center">
            <div className='flex items-center justify-center w-full h-full p-3'>
                <div className='flex items-center justify-center w-[90%] md:w-[38%] h-full'>
                    <form onSubmit={handleSubmit} className='flex justify-center h-full w-80'>
                        <div className='flex flex-col items-center w-full '>
                            <div className='grid grid-cols-3 items-center w-full '>
                                <Link href='/user-mode' className='text-gray-800 text-xl col-span-1'><AiOutlineLeftCircle /></Link>
                                <div className=' col-span-2 flex justify-start items-center pt-2 pb-3'>
                                    <Logo /> 
                                    <h3 className='pl-2 font-semibold text-lg'>TeamUp</h3>
                                </div>
                            </div>
                            <div className='text-center flex flex-col items-center'>
                                <p className=' text-2xl font-semibold'>Create your account</p>
                                <p className='text-primary text-sm font-extralight pt-1'>Fill in your details in the fields provided</p>
                            </div>
                            <div className='flex flex-col justify-between items-center py-5 w-full'>
                                <div className='w-full'>
                                    <label htmlFor="firstName" className="block mb-1 text-sm font-semibold text-[#241E4E] ">First Name </label>
                                    <div className='relative'>  
                                        <input 
                                            type="text" 
                                            name="firstName" 
                                            id="firstName" 
                                            placeholder="Enter your first name" 
                                            required
                                            value={formData.firstName} 
                                            onChange={handleChange} 
                                            className="bg-gray-50 border border-gray-400 outline-1 outline-[#A396FF] text-[#241E4E] sm:text-sm rounded-full focus:ring-[#A396FF] focus:border-[#A396FF] block w-full h-10 pl-8 bg-transparent "/>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineUserCircle />
                                            </span>
                                    </div>
                                </div>
                                <div className='w-full py-3'>
                                    <label htmlFor="lastName" className="block mb-1 text-sm font-semibold text-[#241E4E] ">Last Name </label>
                                    <div className='relative'>
                                        <input 
                                            type="text" 
                                            name="lastName" 
                                            id="lastName" 
                                            placeholder="Enter your last name" 
                                            required
                                            value={formData.lastName} 
                                            onChange={handleChange} 
                                            className="bg-gray-50 border border-gray-400 outline-1 outline-[#A396FF] text-[#241E4E] sm:text-sm rounded-full focus:ring-[#A396FF] focus:border-[#A396FF] block w-full h-10 pl-8 bg-transparent "/>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineUserCircle />
                                            </span>
                                    </div>
                                </div>

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
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            className="bg-gray-50 border border-gray-400 outline-1 outline-[#A396FF] text-gray-800 sm:text-sm rounded-full focus:ring-[#A396FF] focus:border-[#A396FF] block w-full h-10 pl-8 bg-transparent "/>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineMail />
                                            </span>
                                    </div>
                                </div>

                                <div className='w-full py-3'>
                                    <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-900 ">Password </label>
                                    <div className="relative">
                                        <input 
                                            type={isPasswordVisible ? "text" : "password"}
                                            // type="password" 
                                            name="password" 
                                            id="password" 
                                            placeholder="••••••••" 
                                            required 
                                            autoComplete="off"
                                            value={formData.password} 
                                            onChange={handleChange}
                                            pattern="^.{8,}$"
                                            title="Password must be at least 8 characters long."
                                            className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-full focus:ring-primary focus:border-primary block w-full h-10 pl-8 bg-transparent" />
                                            <span className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                            onClick={togglePasswordVisibility}>
                                            {isPasswordVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                                            </span>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineKey />
                                            </span>
                                    </div>
                                            <p className="text-xs mt-1"> {getStrengthLevel()}</p>
                                </div>

                                {/* <div className='w-full'>
                                    <label htmlFor="password" className="block mb-1 text-xs font-semibold text-gray-900 ">Confirm Password</label>
                                    <div className="relative">
                                        <input 
                                            type={isPasswordVisible ? "text" : "password"}
                                            // type="password" 
                                            name="password" 
                                            id="password" 
                                            placeholder="••••••••" 
                                            required 
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-full focus:ring-primary focus:border-primary block w-full h-9 pl-8 bg-transparent" />
                                            <span className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                            onClick={togglePasswordVisibility}>
                                            {isPasswordVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                                            </span>
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                <HiOutlineKey />
                                            </span>
                                    </div>
                                </div> */}
                            </div>

                            
                            <span className='w-full'>
                                <button className='rounded-full bg-primary w-full text-white text-sm h-10 tracking-wide'>
                                {loading ? 
                                <Loader/> 
                                : "Continue"}
                                </button>
                            </span>
                            <p className='pt-3 text-gray-400 text-sm font-extralight'>Already have an account? <Link href='/sign-in' className='text-gray-600 font-semibold'>Login</Link> </p>
                        </div>
                    </form>
                </div>

                <div className='hidden md:flex justify-center items-center w-[62%] h-full'>
                    <div className=' flex justify-center items-center h-full w-full rounded-l-[70px] bg-primary overflow-hidden'>
                        Image
                    </div>
                </div>
            </div>
        </section>
  )
}

export default SignUp