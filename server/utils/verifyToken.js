
import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"
import axios from "axios"



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



// generateToken
export const generateToken = async (req,res,next) => {

    const secrete = process.env.CONSUMER_SECRETE 

    const consumer = process.env.CONSUMER_KEY

    const auth = new Buffer.from(`${consumer}:${secrete}`).toString("base64")

    await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers:{
                authorization:`Basic ${auth}`
            }
        })
        .then((response) => {

             req.token = response.data.access_token
            
            

            next()
        })
        .catch((err) => {

            console.log(err.message,"yes error")

        })

}

