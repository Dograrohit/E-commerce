import React from 'react'
import {assets} from '../Assets/admin_assets/assets'
import axios from 'axios'
import { backend } from '../App'
import { toast, ToastContainer } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

const Navbar = ({setAuth}) => {

  const Navigate = useNavigate()

  const logout = async()=>{
     try {
      let response = await axios.post(`${backend}/api/user/logout`,{},{withCredentials:true})
     
     if(response.data.success === true){
       toast.success(response.data.message)
       setAuth(false)
       Navigate("/login")
     }
     } catch (error) {
        console.log(error)
        toast.error("logout failed")
     }
  }

  return (
    <>
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt=''></img>
      <button onClick={logout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
    </>
  )
}

export default Navbar
