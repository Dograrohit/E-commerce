const cloudinary = require("cloudinary").v2
const productModel = require("../models/Product.model")

// function for add product
const addProduct = async(req,res)=>{
    
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            subCategory,
            price:Number(price),
            sizes:sizes ? JSON.parse(sizes) : [],
            bestseller:bestseller === "true" ? true : false,
            images:imageUrl,
            Date:Date.now()
        }

        await productModel.create(productData)

       return res.status(200).json({success:true,message:"product added"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

//function for list Product
const listProduct = async(req,res)=>{
    try{
        
       const products = await productModel.find({})
       res.json({success:true,products})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error})
    }
}

//function for removing Product
const removeProduct = async(req,res)=>{
    try {
        
     const deletedata =  await productModel.findByIdAndDelete(req.body.id)

     res.json({success:true,deletedata})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:error})
    }
}

//function for single product info
const singleProduct = async(req,res)=>{
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:error})
    }
}

module.exports = {addProduct,listProduct,removeProduct,singleProduct}