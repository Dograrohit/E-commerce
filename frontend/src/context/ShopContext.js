import { createContext, useEffect, useState } from "react";
import { products } from "../context/assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()

 const ShopContextProvider = (props)=>{

    const currency = '$'
    const delivery_fee = 10
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const [cartitems,setCartitems] = useState({});
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

    
    const value = {
         products , delivery_fee , currency,
         search,setSearch,showSearch,setShowSearch,
         cartitems,addtoCart,getCartCount,updateQuantity,
         getCartAmount,navigate 
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

 }


 export default ShopContextProvider;