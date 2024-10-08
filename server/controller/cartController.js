import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const addToCart = async (req,res,next) => {

    const {name,size,number,itemId,userId} = req.body 

    const product = await Product.findById(itemId)

    if(!product)
    {
        return next(errorHandler(404,"Product not found"))
    }

    let additionalCost = 0 ;

    if(name)
    {
        additionalCost += 200

        product.name = name
    }

    if(number)
    {
        additionalCost += 200

        product.number = number
    }
    

    product.discountprice += additionalCost ;

    await product.save()

    product.size = size ;

    try
    {
        await product.save()
        
        let userData = await User.findById(userId)
        
        if(!product)
        {
            return next(errorHandler(404,"Product not found"))
        }

        // if(userData)
        // {
        //     return next(errorHandler(400 ,"User not found"))
        // }

        let cartData = await userData.cartData ;

        if(!cartData[itemId])
        {
            cartData[itemId] = 1
        }
        else
        {
            cartData[itemId] += 1
        }

        await User.findByIdAndUpdate(userId,{cartData})

        res.status(200).json({success:true , message:"Added to cart"})

    }
    catch(error)
    {
        next(error)
    }

}

export const increaseCart = async (req,res,next) => {

    const {userId,itemId} = req.body
    
    try
    {
        let userData = await User.findById(userId)

        let cartData = await userData.cartData ;

        if(!cartData[itemId])
        {
          cartData[itemId] = 1
        }
        else
        {
            cartData[itemId] += 1
        }
    

        await User.findByIdAndUpdate(userId,{cartData})

        res.json({success:true ,message:"product increased in cart"})

    }
    catch(error)
    {
        next(error)
    }

}

export const removeFromCart = async (req,res,next) => {

    const {userId} = req.body
    
    try
    {
        let userData = await User.findById(userId)

        let cartData = await userData.cartData ;

        if(cartData[req.body.itemId] > 0)
        {
            cartData[req.body.itemId] -= 1
        }

        await User.findByIdAndUpdate(userId,{cartData})

        res.json({success:true ,message:"Removed from cart"})

    }
    catch(error)
    {
        next(error)
    }

}

export const getCart = async (req,res,next) => {

    const {userId} = req.body

    try
    {
        let userData = await User.findById(userId)

        let cartData = await userData.cartData 

        res.status(200).json({success:true ,cartData})

    }
    catch(error)
    {
        next(error)
    }

}


