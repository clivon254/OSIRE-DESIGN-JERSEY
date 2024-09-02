import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const addToCart = async (req,res,next) => {

    const {name,size,number,itemId} = req.body 

    const product = await Product.findById(itemId)

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
    
    product.regularprice += additionalCost

    product.size = size ;

    try
    {

        let userData = await User.findById(req.user.id)

        let cartData = await userData.cartData ;

        if(!cartData[itemId])
        {
            cartData[itemId] = 1
        }
        else
        {
            res.json({message:"product already added"})
        }

        await User.findByIdAndUpdate(req.user.id,{cartData})

        res.status(200).json({success:true , message:"Added to cart"})

    }
    catch(error)
    {
        next(error)
    }

}


export const removeFromCart = async (req,res,next) => {

    try
    {
        let userData = await User.findById(req.user.id)

        let cartData = await userData.cartData ;

        if(cartData[req.body.itemId] > 0)
        {
            cartData[req.body.itemId] -= 1
        }

        await User.findByIdAndUpdate(req.user.id,{cartData})

        res.json({success:true ,message:"Removed from cart"})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCart = async (req,res,next) => {

    try
    {
        let userData = await User.findById(req.user.id)

        let cartData = await userData.cartData 

        res.status(200).json({success:true ,cartData})

    }
    catch(error)
    {
        next(error)
    }

}


