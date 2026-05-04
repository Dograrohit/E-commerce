import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up")
  const {navigate,backend,setToken,token} = useContext(ShopContext)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    try {
      if(currentState === "Sign Up"){
         let response = await axios.post(`${backend}/api/user/register`,{name,email,password},{withCredentials:true})
          
           if(response.data.success){
               navigate("/")
               setToken(true)
               toast.success(response.data.message)
            }
      }else{
        let response = await axios.post(`${backend}/api/user/login`,{email,password},{withCredentials:true})
       
          if(response.data.success){
             navigate("/")
             setToken(true)
             toast.success(response.data.message)
           }else{
            toast.error("Email or Password is wrong")
           }
      }
    } catch (error) {
       toast.error(error)
       console.log(error)
    }
  }

  useEffect(()=>{
     if(token === true){
        navigate("/")
     }
  },[token])


  return (
    <>
      <form onSubmit={(e)=>onSubmitHandler(e)} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
          <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
          </div>  
          {currentState === "Login" ? "" : <input onChange={(e)=>{setName(e.target.value)}} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name'></input>}
          <input onChange={(e)=>{setEmail(e.target.value)}} type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='E-mail'></input>
          <input onChange={(e)=>{setPassword(e.target.value)}} type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password'></input>
          <div className='w-full flex justify-between text-sm mt-[8px]'>
               <p className='cursor-pointer'>Forgot your password?</p>  
               {
                currentState === "Login"
                ?<p onClick={()=>setCurrentState("Sign Up")} className='cursor-pointer'>Create account</p>
                :<p onClick={()=>setCurrentState("Login")} className='cursor-pointer'>Login Here</p>
               }
          </div>
          <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === "Login" ? 'Sign In' : 'Sign Up'}</button>
      </form>
      
    </>
  )
}

export default Login
