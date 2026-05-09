import React, { useContext, useState } from 'react' 
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../context/assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod');
  const {navigate,backend,cartitems,setCartitems,getCartAmount,delivery_fee,products} = useContext(ShopContext)
  const [formdata,setFromdata] = useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value

    setFromdata(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async(event)=>{
     event.preventDefault()
      try {
        let orderitems = []

     for(const items in cartitems){
           for(const item in cartitems[items]){
               let iteminfo = structuredClone(products.find(product=>product._id === items))
               if(iteminfo){
                iteminfo.size = item
                iteminfo.quantity = cartitems[items][item]
                orderitems.push(iteminfo)
               }
           }
     }

     let orderData = {
        address:formdata,
        items:orderitems,
        amount:getCartAmount()+delivery_fee
     }

     switch(method){
        //API Calls for COD
        case"cod":
          let response = await axios.post(`${backend}/api/order/place`,orderData,{withCredentials:true})
          if(response.data.success){
             setCartitems({})
             navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
        break

        default:
            break
     }
     
      } catch (error) {
          console.log(error)
          toast.error(error.message)
      }
     
  }

  return (
    <>
      <form onSubmit={(e)=>onSubmitHandler(e)} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        {/*--------------- left side ---------------*/}
          <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
            <div className='text-xl sm:text-2xl my-3'>
                <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
            </div>
            <div className='flex gap-3 my-3'>
                <input required onChange={onChangeHandler} name='firstname' value={formdata.firstname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name'></input>
                <input required onChange={onChangeHandler} name='lastname' value={formdata.lastname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name'></input>
            </div>
             <input required onChange={onChangeHandler} name='email' value={formdata.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='E-Mail address'></input>
             <input required onChange={onChangeHandler} name='street' value={formdata.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street'></input>
             <div className='flex gap-3 my-3'>
                <input required onChange={onChangeHandler} name='city' value={formdata.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City'></input>
                <input required onChange={onChangeHandler} name='state' value={formdata.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State'></input>
            </div>
             <div className='flex gap-3 my-3'>
                <input required onChange={onChangeHandler} name='zipcode' value={formdata.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='ZipCode'></input>
                <input required onChange={onChangeHandler} name='country' value={formdata.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country'></input>
            </div>
             <input required onChange={onChangeHandler} name='phone' value={formdata.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone'></input>
          </div> 
          {/*--------------- Right Side --------------*/}
          <div className='mt-8'>
              <div className='mt-8 min-w-80'>
                 <CartTotal/>
              </div> 
              <div className='mt-12'>
                 <Title text1={'PAYMENT'} text2={"METHOD"}/>
                 {/*----------------- Payment Method-----------------*/}
                 <div className='flex gap-3 flex-col lg:flex-row'>
                     <div onClick={()=>setMethod("stripe")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                         <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
                         <img className='h-5 mx-4' src={assets.stripe_logo}></img>
                     </div>
                     <div onClick={()=>setMethod("razorpay")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                         <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
                         <img className='h-5 mx-4' src={assets.razorpay_logo}></img>
                     </div>
                     <div onClick={()=>setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                         <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p> 
                         <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                     </div>
                 </div>
                 <div className='w-full text-end mt-8'>
                     <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button> 
                 </div>
              </div>
          </div>
      </form>
    </>
  )
}

export default PlaceOrder
