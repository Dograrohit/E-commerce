import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../context/assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const {productId} = useParams()
  const {products,currency,addtoCart} = useContext(ShopContext)
  const [ProductData,setProductData] = useState(false)
  const [image,setImage] = useState('')
  const [size,setSize] = useState('')
  const [fade, setFade] = useState(true)

  const fetchproductData = async ()=>{
     products.map((item)=>{
        if(item._id === productId){
          setProductData(item)
          setImage(item.image[0])
          return null
        }
     })
  } 

  const changeImage = (item) => {
  setFade(false)

  setTimeout(() => {
    setImage(item)
    setFade(true)
  }, 300)
}

  useEffect(()=>{
        fetchproductData();
  },[productId,products,ProductData])
  return ProductData ? (
    <>
      <div className='border-t-2  pt-10 transiton-opacity ease-in duration-500 opacity-100'>
          {/* Products Data */}
         <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
              {/* product Images */}
              <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                  <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                      {
                        ProductData.image.map((item,index)=>(
                          <img onClick={()=>changeImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer '></img>
                        ))
                      }
                  </div>
                  <div className='w-full sm:w-[80%]'>
                       <img className={`w-full h-auto border border-orange-500 rounded-[5%] transition-opacity duration-500 ease-in ${fade ? "opacity-100" : "opacity-0"}`} src={image}></img>
                  </div>
              </div>
               
               {/* --------Product Info-------- */}
               <div className='flex-1'>
                  <h1 className='font-medium text-2xl mt-2'>{ProductData.name}</h1>
                  <div className='flex items-center gap-1 mt-2'>
                       <img src={assets.star_icon} alt='' className='w-3 5'></img>
                       <img src={assets.star_icon} alt='' className='w-3 5'></img>
                       <img src={assets.star_icon} alt='' className='w-3 5'></img>
                       <img src={assets.star_icon} alt='' className='w-3 5'></img>
                       <img src={assets.star_dull_icon} alt='' className='w-3 5'></img>
                       <p className='pl-2'>(122)</p>
                  </div>
                  <p className='mt-5 text-3xl font-medium'>{currency}{ProductData.price}</p>
                  <p className='mt-5 text-gray-500 md:w-4/5'>{ProductData.description}</p>
                  <div className='flex flex-col gap-4 my-8'>
                     <p>select size</p>
                     <div className='flex gap-4'>
                        {ProductData.sizes.map((item,index)=>(
                             <button onClick={()=>setSize(item)} className={`bg-gray-200 py-2 px-4 border rounded ${item === size ? 'border-orange-500':''}`} key={index}>{item}</button>
                        ))}
                     </div>
                  </div>
                   <button onClick={()=>addtoCart(ProductData._id,size)} className='rounded-[10px] bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                   <hr className='mt-8 sm:w-4/5'></hr>
                   <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                       <p>100% Original Product.</p>
                       <p>Cash on delivery is available on this product.</p>
                       <p>Easy return and exchange policy within 7 days.</p>
                   </div>
               </div> 
         </div>
             {/* ----------Discription---------- */}
             <div className='mt-20'>
                <div className='flex'>
                   <b className='border px-5 py-3 text-sm'>Discription</b>
                   <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>Browse our handpicked selection of trending products loved by customers. Each item is carefully chosen for quality, style, and value.</p>
                    <p>Experience powerful sound and all-day comfort with our wireless Bluetooth headphones. Designed with advanced noise isolation technology and long-lasting battery life, these headphones are perfect for music, calls, and gaming.</p>
                </div>
             </div>
             {/* ----------Display related products---------- */}
             <RelatedProducts category={ProductData.category} subCategory={ProductData.subCategory}/>
      </div>               
    </>      
  ) : <div className='opacity-0'></div>
}

export default Product
