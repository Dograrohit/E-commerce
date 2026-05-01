import React, { useContext, useState } from 'react'
import {assets} from '../context/assets/frontend_assets/assets'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const[visible,setvisible] = useState(false)
  const {setShowSearch,getCartCount,backend,setToken,token,setCartitems,navigate} = useContext(ShopContext)

  const logout = async()=>{
    try {
         let response = await axios.post(`${backend}/api/user/logout`,{},{withCredentials:true})
    if(response.data.success){
        toast.success(response.data.message)
         setToken(false)
        setCartitems({})
        navigate("/login")
       }
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    
  }

  return (
    <>
       <div className='flex items-center justify-between py-5 px-3 md:px-10 font-medium'>

         <Link to='/'> <img src={assets.logo} className='w-32' alt='Logo'></img> </Link>

         <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' ></hr>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
         </ul>

         <div className='flex items-center gap-6'>
               <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt='search icon'></img>

              <div className='group relative'>
                  <Link to={"/login"}><img src={assets.profile_icon} className='w-5 cursor-pointer' alt='profie-icon'></img></Link>
                  {/* its a dropdown menu */}
                  {token &&
                     <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                       <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                          <p className='cursor-pointer hover:text-black'>My Profile</p>
                          <p onClick={()=>{navigate("/orders")}} className='cursor-pointer hover:text-black'>Orders</p>
                          <p onClick={()=>{logout()}} className='cursor-pointer hover:text-black'>Logout</p>
                       </div>
                  </div>
                  }
                 
              </div>
              <Link to='/cart' className='relative'>
                 <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart-icon'></img>
                 <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
              </Link>
              <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='menu-icon'></img>
         </div>

         {/* sidebar menu for small screens*/}

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? `w-full` : `w-0`}`}>
             <div className='flex flex-col text-grey-600'>
                 <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                     <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='dropdown-icon'></img>
                     <p>Back</p>
                  </div>  
                  <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink> 
                  <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink> 
                  <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink> 
                  <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink> 
             </div>
        </div>
     
       </div>
    </>
  )
}

export default Navbar
