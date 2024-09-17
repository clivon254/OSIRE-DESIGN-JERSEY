

import Product from "../model/productModel.js"
import { errorHandler } from "../utils/error.js"



export const addProduct = async (req,res,next) => {

    // if(!req.user.isAdmin)
    // {
    //     return next(errorHandler(403,"only an Admin can add product"))
    // }

    const {team,status,season,league,tag,instock,wholesale,regularprice,discountprice,imageUrls} = req.body 

    try
    {
        const product = new Product({
            team,status,season,league,tag,instock,wholesale,regularprice,discountprice,imageUrls
        })

        await product.save()

        res.status(200).json({success:true , product , message:`${team} jersey added sucessfully`})
    }
    catch(error)
    {
        next(error)
    }

}


export const getProduct = async (req,res,next) => {

    try
    {
        const product = await Product.findById(req.params.productId)

        res.status(200).json({success:true ,product })
    }
    catch(error)
    {
        next(error)
    }

}


export const getProducts = async (req,res,next) => {

    try
    {
        const startIndex = parseInt(req.query.startIndex) || 0 ;

        const limit = parseInt(req.query.limit) || 20 ;

        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const products = await Product.find({
            ...(req.query.status && {status :req.query.status}),
            ...(req.query.league && {league :req.query.league}),
            ...(req.query.tag && {tag :req.query.tag}),
            ...(req.query.season && {season :req.query.season}),
            ...(req.query.team && {team :req.query.team}),
            ...(req.query.searchTerm && {team :{$regex:searchTerm ,$options:'i'}})
           })
           .sort({updatedAt:sortDirection})
           .skip(startIndex)
           .limit(limit)

        res.status(200).json({success:true , products})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateProduct = async (req,res,next) => {

    // if(!req.user.isAdmin)
    // {
    //     return next(errorHandler(403,"you are not allowed to delete this product"))
    // }

    try
    {

        const product = await Product.findById(req.params.productId)

        if(!product)
        {
            return next(errorHandler(404, "product not found"))
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            {
                $set:{
                    team:req.body.team,
                    status:req.body.status,
                    season:req.body.season,
                    league:req.body.league,
                    tag:req.body.tag,
                    wholesale:req.body.wholesale,
                    regularprice:req.body.regularprice,
                    discountPrice:req.body.discountPrice,
                    instock:req.body.instock,
                    imageUrls:req.body.imageUrls,
                }
            },
            {
                new:true
            }
        )

        res.status(200).json({success:true ,updatedProduct})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteProduct = async (req,res,next) => {
    
    // if(!req.user.isAdmin)
    // {
    //     return next(errorHandler(403,"You are not allowed to delete the product"))
    // }

    try
    {
        await Product.findByIdAndDelete(req.params.productId)

        res.status(200).json({success:true ,message:"product deleted successfully"})
    }
    catch(error)
    {
        next(error)
    }

}


