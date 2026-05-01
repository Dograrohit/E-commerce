import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext = createContext()

 const ShopContextProvider = (props)=>{

    const currency = '$'
    const delivery_fee = 10
    const backend = process.env.REACT_APP_BACKEND_URL
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const [cartitems,setCartitems] = useState({});
    const [products,setProducts] = useState([])
    const [token,setToken] = useState(false)

    const navigate = useNavigate()

    const addtoCart = async (itemId,size)=>{
        if(!size){
            toast.error("Select Product Size")
            return
        }
        let cartdata = structuredClone(cartitems)

        if(cartdata[itemId]){
            if(cartdata[itemId][size]){
                cartdata[itemId][size] += 1
            }else{
                cartdata[itemId][size] = 1
            }
        }else{
            cartdata[itemId] = {}
            cartdata[itemId][size] = 1
        }
        setCartitems(cartdata)
    }

    const getCartCount = ()=>{
        let totalCount = 0
        for(const items in cartitems){ 
            for(const item in cartitems[items]){
               try{
                if(cartitems[items][item]>0){
                   totalCount += cartitems[items][item];
                }
               }catch(error){

               }
            }
        }
        return totalCount
    }

   const updateQuantity = async (itemId,size,quantity)=>{
      let cartData = structuredClone(cartitems);

      cartData[itemId][size] = quantity;

      setCartitems(cartData)
   }

   const getCartAmount = ()=>{
     let totalAmount = 0;
     for(const items in cartitems){
        let itemInfo = products.find((product)=> product._id === items);
        for(const item in cartitems[items]){
            try{
                if(cartitems[items][item]>0){
                   totalAmount += itemInfo.price * cartitems[items][item]
                }
                    
            }catch (error){}

        }
     }
     return totalAmount
   }

   const getProductData = async()=>{
    try {
        let response = await axios.get(`${backend}/api/product/list`)
        if(response.data.success){
            setProducts(response.data.products)
            console.log(response.data.products)
        }else{
            toast.error(response.data.error)
        }
    } catch (error) {
        console.log(error)
        toast.error("server error")
    }
   }

   const authcheck = async()=>{
    try {
        let response = await axios.get(`${backend}/api/user/authuser`,{withCredentials:true})
        if(response.data.success){
            setToken(true)
        }
           
    } catch (error) {
         console.log(error)
    }
   }

   let check = async()=>{
     let response = await axios.post(`${backend}/api/cart/add`,{},{withCredentials:true})
   }

   useEffect(()=>{
       getProductData()
       authcheck()
       check()
   },[])
    
    const value = {
         products, delivery_fee , currency,
         search,setSearch,showSearch,setShowSearch,
         cartitems,setCartitems,addtoCart,getCartCount,updateQuantity,
         getCartAmount,navigate,backend,token,setToken
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

 }


 export default ShopContextProvider;