import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backend, currency } from '../App'
import { toast } from 'react-toastify'

const List = () => {

  const [list,setList] = useState([])

  const fetchList = async () =>{
     try {

      const response = await axios.get(backend + '/api/product/list')

      if(response.data.success){
          setList(response.data.products)
         
      }else{
        toast.error(response.data.message)
      }
    
     } catch (error) {
        console.log(error)
        toast.error(error.message)
     }
  }

  let removeproduct = async(id)=>{
    try {
      let response = await axios.post(`${backend}/api/product/remove`,{id},{withCredentials:true})

      if(response.data.success){
        toast.success("removed")
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(()=>{
     fetchList()
  },[])

  return (
    <>
     <p className='mb-2'>All Products List</p>
      <div className='w-[90%] flex flex-col gap2'>
  
      {/* ---------- List Table Title ---------- */}

         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 border text-sm py-2 px-2'>
           <b>Image</b>
           <b>Name</b>
           <b>Category</b>
           <b>Price</b>
           <b className='text-center'>Action</b>
         </div>

         {/* Product list */}

         {
          list.map((item,index)=>(
            <>
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 border text-sm' key={index}>
               <img className='w-[5rem]' src={item.images[0]}></img>
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>{currency}{item.price}</p>
               <p onClick={()=>removeproduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
            </>
          ))
         }

      </div>
    </>
  )
}

export default List
