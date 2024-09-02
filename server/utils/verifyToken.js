import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken = async (req,res,next) => {

    const token = req.cookies.access_token

    if(!token)
    {
        return next(errorHandler(403,'forbiden'))
    }

    jwt.verify(token ,process.env.JWT_SECRETE,(err,user) => {

        if(err)
        {
            return next(errorHandler(401,"unauthorized"))
        }

        req.user = user 

        next()
    })
}