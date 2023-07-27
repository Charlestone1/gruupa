import Logo from '@/components/Logo';
import {HiOutlineUser, HiOutlineUsers, HiOutlineUserGroup} from 'react-icons/hi'
import Link from 'next/link'

const UserMode = () => {
    return (
        <section className="md:w-screen md:h-screen flex justify-center items-center">
            <div className='flex items-center justify-center w-full h-full p-3'>
                <div className='flex items-center justify-center w-[38%] h-full'>
                    <div className='flex justify-center h-full w-72'>
                        <div className='flex flex-col items-center'>
                            <div className='flex justify-center items-center py-8'>
                                <Logo /> 
                                <h3 className='pl-2 font-semibold'>TeamLink</h3>
                            </div>
                            <div className='text-center flex flex-col items-center'>
                                <p className=' text-2xl font-semibold w-[85%]'>Why are you creating this account?</p>
                                <p className='text-primary text-xs font-extralight pt-3'>You can always change this in your settings</p>
                            </div>
                            <div className='flex justify-between items-center py-8 w-full'>
                                <article className='flex items-center justify-center h-32 w-32 bg-primary_lite rounded-md'>
                                    <div className='relative flex flex-col items-center text-center px-[6px]'>
                                        <span className='flex justify-center items-center h-11 w-11 text-3xl text-white rounded-md bg-primary'>
                                            <HiOutlineUser />
                                        </span>
                                        <input type="radio" name="account-mode" id="account-type" className='accent-primary absolute top-0 right-3'/>
                                        <p className='text-sm font-light pt-4'>I want to create groups for others</p>
                                    </div>
                                </article>
                                <article className='flex items-center justify-center h-32 w-32 bg-primary_lite rounded-md'>
                                    <div className='relative flex flex-col items-center text-center px-[6px]'>
                                        <span className='flex justify-center items-center h-11 w-11 text-3xl text-white rounded-md bg-primary'>
                                            <HiOutlineUserGroup />
                                        </span>
                                        <input type="radio" name="account-mode" id="account-type" className='accent-primary absolute top-0 right-3'/>
                                        <p className='text-sm font-light pt-4'>I want to access my groups</p>
                                    </div>
                                </article>
                            </div>
                            <Link href='/sign-up' className='w-full'>
                                <button className='rounded-full bg-primary w-full text-white text-sm h-10 tracking-wide'>Continue</button>
                            </Link>
                            <p className='py-8 text-gray-400 text-sm font-extralight'>Already have an account? <Link href='/login' className='text-gray-600 font-semibold'>Login</Link> </p>
                        </div>
                    </div>
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
    
    export default UserMode