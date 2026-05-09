import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const {products,currency,backend} = useContext(ShopContext)

  const [orderList,setOrderList] = useState([])

  const Orders = async()=>{

    try {
      const response = await axios.post(`${backend}/api/order/userorders`,{},{withCredentials:true})
      let order = response.data.orders

      order.map((items,index)=>{
          items.items.map((item,idx)=>{
            if(item.quantity > 0){
              item["status"]=items.status
              item["payment"]=items.payment
              item["paymentMethod"]=items.paymentMethod
              item["date"]=items.date
              orderList.push(item)
            }
          })
      })
    } catch (error) {
       toast.error(error.message)
       console.log(error)
    }
    
  }

  useEffect(()=>{
    Orders()
  },[])

  return (
    <>
      <div className='border-t pt-16'>
          <div className='text-2xl'>
              <Title text1={"MY"} text2={"ORDERS"}/>
          </div>

          <div>
             {
              orderList.map((item,index)=>(
                <>
                  <div key={item._id} className='py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                      <div className='flex items-start gap-6 text-sm'>
                          <img className='w-16 sm:w-26' src={item.images[0]}></img>
                          <div>
                            <p className='sm:text-base font-medium'>{item.name}</p>
                            <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                               <p className='text-lg'>{currency}{item.price}</p>
                               <p>Quantity: {item.quantity}</p>
                               <p>Size: {item.size}</p>
                            </div>
                            <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.Date).toDateString()}</span></p>
                            <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                          </div>
                      </div>
                      <div className='md:w-1/2 flex justify-between'>
                          <div className='flex items-center gap-2'>
                              <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                              <p className='text-sm md:text-base'>{item.status}</p>
                          </div>
                          <button onClick={Orders} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                      </div>
                  </div>
                </>
              ))
             }
          </div>
      </div>
    </>
  )
}

export default Orders
