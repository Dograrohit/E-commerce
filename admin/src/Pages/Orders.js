import React, { useEffect, useState } from 'react'
import axios from "axios"
import { backend, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../Assets/admin_assets/assets'

const Orders = () => {

  const [orders,setOrders] = useState([])

  const allOrder = async()=>{
    let response = await axios.post(`${backend}/api/order/list`,{},{withCredentials:true})
    let list = response.data.orders
          if(response.data.success === true){
             setOrders(response.data.orders)
          }else{
             toast.error(response.data.message)
          }
  }

  const statusUpdate = async(event,orderid)=>{
    try {
      let response = await axios.post(`${backend}/api/order/status`,{orderid,status:event.target.value},{withCredentials:true})
       if(response.data.success === true){
        await allOrder()
       }
    } catch (error) {
      toast.error(error.message)
    }
  }


useEffect(()=>{
     allOrder()
},[])
  return (
    <>
      <div>
         <h3>Order Page</h3>
         <div>
           {
            orders.map((order,index)=>(
               <>
               <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-col-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                   <img className='w-20' src={assets.parcel_icon}></img>

                <div>
                   <div>
                      {order.items.map((item,index)=>{
                          if(index === order.items.length-1){
                              return <p className='py-0.5' key={index}>{item.name} X {item.quantity}<span>{item.size}</span></p>
                          }else{
                             if(item.quantity > 0){
                               return <p className='py-0.5' key={index}>{item.name} X {item.quantity}<span>{item.size}</span></p>
                             } 
                          }
                      })} 
                   </div>
                   <p className='mt-3 mb-2 font-bold'>{order.address.firstname +" "+ order.address.lastname}</p>
                   <div>
                     <p>{order.address.street + ", "}</p>
                     <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                   </div>
                   <p>{order.address.phone}</p>
               </div>

               <div>
                 <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                 <p className='mt-3'>Method : {order.paymentMethod}</p>
                 <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                 <p>Date : {new Date(order.date).toDateString()}</p>
               </div>
               <p className='text-sm sm:text[15px]'>{currency}{order.amount}</p>
               <select onChange={(e)=>statusUpdate(e,order._id)} value={order.status} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Deliverd">Deliverd</option>
               </select>
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
