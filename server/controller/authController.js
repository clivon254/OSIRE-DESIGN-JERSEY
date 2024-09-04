
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../model/userModel.js"
import nodemailer from "nodemailer"


export const signup = async (req,res,next) => {

    const {username, email, password} = req.body 

    if(!username || !password || !email || username === "" || email === "" || password === "")
    {
        return next(errorHandler(400,"please fill all the feilds"))
    }

    const hashedPassword = bcryptjs.hashSync(password ,10)

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    try
    {
        await newUser.save()

        res.status(200).json({success:true , newUser})
        
    }
    catch(error)
    {
        next(error)
    }

}


export const signin = async (req,res,next) => {

    const {email, password} = req.body ;
    
    if(!email || !password || email === "" || password === "")
    {
        return next(errorHandler(400,"please fill all the feilds"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch)
        {
            return next(errorHandler(401, "invalid password"))
        }

        const cookieOptions={
            httpOnly:true,
            secure:true,
            sameSite:'strict'
        }

        const token = jwt.sign(
            {id:user._id ,isAdmin:user.isAdmin},
            process.env.JWT_SECRETE
        )

        const {password:pass, ...rest} = user._doc 

        res.status(200)
            .cookie('access_token',token, cookieOptions)
            .json({success:true ,rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const signout = async (req,res,next) => {

    try
    {
        res.clearCookie('access_token')
           .status(200)
           .json({success:true, message:"you have successfully signed out"})

    }
    catch(error)
    {
        next(error)
    }

}


export const google = async (req,res,next) => {

    try
    {
        const user = await User.findOne({email:req.body.email})

        if(user)
        {
            const token = jwt.sign(
                {id:user._id ,isAdmin:user.isAdmin},
                process.env.JWT_SECRETE
            )
    
            const {password:pass, ...rest} = user._doc 
    
            res.status(200)
                .cookie('access_token',token,{httpOnly:true})
                .json({success:true ,rest})
        }
        else
        {
            const generatedPassword = Math.random().toString(36).slice(-8) +
                                      Math.random().toString(36).slice(-8)

            const hashedPassword = bcryptjs.hashSync(generatedPassword , 10)

            const newUser = new User({
                username:req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8),
                email:req.body.email,
                password:hashedPassword,
                profilePicture:req.body.photo
            })

            await newUser.save()
            
            const token = jwt.sign(
                {id:newUser._id ,isAdmin:newUser.isAdmin},
                process.env.JWT_SECRETE
            )
    
            const {password:pass, ...rest} = newUser._doc 
    
            res.status(200)
                .cookie('access_token',token,{httpOnly:true})
                .json({success:true ,rest})

        }

    }
    catch(error)
    {
        next(error)
    }

}

export const forgotPassword = async (req,res,next) => {

    const {email} = req.body ;

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        const token = jwt.sign(
                        {id:user._id},
                        process.env.JWT_SECRETE,
                        {expiresIn:'1h'}
                    )
        
        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        var mailOptions = {
            from:"OSIRE DESIGN JERSEY",
            to:user.email,
            subject:"Reset Passord",
            text:`Click on this link to reset your password: http://localhost:5173/reset-password/${token}`
        }

        transporter.sendMail(mailOptions ,(error, info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }

        })

        res.status(200).json({success:true ,message:"link sent to your email successfully"})

    }
    catch(error)
    {
        next(error)
    }

}

export const resetPassword = async (req,res,next) => {

    const {token} = req.params ;

    const {password, confirmPassword} = req.body

    try
    {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        if(password !== confirmPassword)
        {
            return next(errorHandler(400,"password and confirm password must be same"))
        }

        const hashedPassword = bcryptjs.hashSync(password,10)

        user.password = hashedPassword ;

        await user.save()

        res.status(200).json({success:true , message:"password successfully reset"})

    }
    catch(error)
    {
        next(error)
    }

}

