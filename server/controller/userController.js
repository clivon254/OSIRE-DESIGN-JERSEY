
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"



export const getUser = async (req,res,next) => {

    try
    {
        const user = await User.findById(req.params.userId)

        if(!user)
        {
            return next(errorHandler(404, "user not found"))
        }

        const {password:pass , ...rest} = user._doc ;

        res.status(200).json({success:true ,rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const getUsers = async (req,res,next) => {

    try
    {
        const users = await User.find({})

        res.status(200).json({success:true ,users})
    }
    catch(error)
    {
        next(error.message)
    }

}


export const updateUser = async (req,res,next) => {

    if(req.user.id !== req.params.userId)
    {
        return next(errorHandler(403,"you are not allowed to update this user"))
    }

    try
    {
        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password , 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    $set:{
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password,
                        profilePicture:req.body.profilePicture
                    }
                },
                {new :true}
           )

        const {password, ...rest} = updatedUser._doc 

        res.status(200).json({success:true ,rest})

    }
    catch(error)
    {
        next(error)
    }

}



export const deleteUser = async (req,res,next) => {
    
    if(req.user.id !== req.params.userId || !req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to delete the user"))
    }

    try
    {
        await User.findByIdAndDelete(req.params.userId)

        res.clearCookie('access_token')

        res.status(200).json({success:true ,message:"user has been deleted sucessfully"})
    }
    catch(error)
    {
        next(error)
    }

}