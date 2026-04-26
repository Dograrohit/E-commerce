import React, { useEffect, useState } from 'react'
import { backend } from '../App'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = ({setAuth}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const Navigate = useNavigate()

    const onSubmitHandler = async(e)=>{
      try {
        e.preventDefault()
        const response = await axios.post(`${backend}/api/user/admin`,{email,password},{withCredentials:true})
        console.log(response.data)
        if(response.data.success === true){
           setAuth(true)
           Navigate("/add")
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }

    }

    

  return (
    <>
      <div className='min-h-screen flex items-center justify-center w-full border'>
          <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
             <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
             <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='Your@email.com' required></input>
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='Password' placeholder='Enter your Password' required></input>
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
             </form>
          </div>
      </div>
    </>
  )
}

export default Login
