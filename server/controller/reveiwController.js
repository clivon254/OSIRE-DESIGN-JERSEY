
import Product from "../model/productModel.js";
import Reveiw from "../model/reveiwModel.js";
import { errorHandler } from "../utils/error.js";




export const addReveiw = async (req,res,next) => {

    const {content ,rating , userId} = req.body ;

    const productId = req.params.productId

    
    try
    {
       
        const existingRating = await Reveiw.findOne({userId,productId})

        if(existingRating)
        {
            return next(errorHandler(400,("you already have this reveiw")))
        }

        const newReveiw = new Reveiw({
            userId,
            productId,
            rating,
            content
        })

        await newReveiw.save()

        // update product average rating
        const ratings = await Reveiw.find({productId})

        const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length

        await Product.findByIdAndUpdate(productId, {averageRating})

        res.status(201).json({success:true ,message:"Rating created"})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateReveiw = async (req,res,next) => {

    const {rating , userId} = req.body

    const productId = req.params.productId


    try
    {
        const existingReveiw = await Reveiw.findOne({userId,productId})

        if(!existingReveiw)
        {
            return next(errorHandler(404, "reveiw not found"))
        }

        existingReveiw.rating = rating 

        if(req.body.content)
        {
            existingReveiw.content = req.body.content
        }

        await existingReveiw.save()

         // update product average rating
         const ratings = await Reveiw.find({productId})

         const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
 
         await Product.findByIdAndUpdate(productId, {averageRating})
        
         res.status(200).json({success:true , message:"Rating updated"})
    }
    catch(error)
    {
        next(error)
    }

}


export const getReveiws = async (req,res,next) => {

    const productId = req.params.productId

    try
    {
        const reveiws = await Reveiw.find({productId})
                                    .populate('userId')

        res.status(200).json({success:true , reveiws})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteReveiw = async (req,res,next) => {

    const productId = req.params.productId 

    const userId = req.body.userId 
    
    try
    {
        const existingReveiw = await Reveiw.findOne({userId, productId})

        if(!existingReveiw)
        {
            return next(errorHandler(404,"reveiw not found"))
        }

        await Reveiw.findByIdAndDelete(existingReveiw._id)

        // update product average rating
        const ratings = await Reveiw.find({productId})

        const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length

        await Product.findByIdAndUpdate(productId, {averageRating})

        res.status(201).json({success:true ,message:"Rating deleted"})
    }
    catch(error)
    {
        next(error)
    }

}