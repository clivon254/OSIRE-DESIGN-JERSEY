
import axios from "axios"
import Order from "../model/orderModel.js"
import User from "../model/userModel.js"
import Stripe from "stripe"
import Payment from "../model/paymentModel.js"


const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY)



export const placeOrder = async (req,res,next) => {

    const frontend_url = "http://localhost:5174"

    const {items,address,paymentmethod,amount,userId} = req.body

    try
    {
        if(!['stripe','mpesa','payment after delivery'].includes(paymentmethod))
        {
            return next(errorHandler(400 ,"invalid payment method"))
        }

        const newOrder = new Order({
            items,
            address,
            paymentmethod,
            amount,
            userId
        })


        await User.findByIdAndUpdate(userId, {cartData:{}})

        // handle payment based on the selected Method
        switch(paymentmethod)
        {
            case 'mpesa':
                try
                {
                    const token = req.token ;

                    const phone = address.phone.substring.amount

                    const date = new Date()

                    const timestamp = 
                             date.getFullYear() + 
                            ("0" + (date.getMonth() + 1)).slice(-2) +
                            ("0" + date.getDate()).slice(-2) +
                            ("0" + date.getHours()).slice(-2) +
                            ("0" + date.getMinutes()).slice(-2) +
                            ("0" + date.getSeconds()).slice(-2)  
                    
                    const shortcode = process.env.PAYBILL 

                    const passkey = process.env.PASS_KEY ;

                    const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")

                    const response = await axios.post(
                        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
                        {    
                            "BusinessShortCode": shortcode,    
                            "Password": password,    
                            "Timestamp":timestamp,    
                            "TransactionType": "CustomerPayBillOnline",    
                            "Amount": amount,    
                            "PartyA":`254${phone}`,    
                            "PartyB":shortcode,    
                            "PhoneNumber":`254${phone}`,    
                            "CallBackURL": "https://30ae-41-209-60-94.ngrok-free.app/api/order/callback",    
                            "AccountReference":"OSIRE DESIGN JERSEY COMPANY",    
                            "TransactionDesc":"Test"
                         },
                         {
                            headers:{
                                Authorization:`Bearer ${token}`
                            }
                         })
                         

                     await newOrder.save()

                     res.status(200).json(response.data)

                    break;
                }
                catch(error)
                {
                    console.log(error.message)
                }
            case 'stripe':
                try
                {
                    const line_items = items.map((item) => (
                        {
                            price_data:{
                                currency:'usd',
                                product_data:{
                                    name:item.team
                                },
                                unit_amount:item.discountprice
                            },
                            quantity:item.quantity
                        }
                    ))

                    line_items.push({
                        price_data:{
                            currency:'usd',
                            product_data:{
                                name:"Delivery Charges"
                            },
                            unit_amount:100
                        },
                        quantity:1
                    })

                    const session = await stripe.checkout.sessions.create({
                        line_items:line_items,
                        mode:"payment",
                        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
                    })

                    await newOrder.save()

                    res.status(200).json({success:true ,session_url:session.url ,newOrder})

                    break;
                }
                catch(error)
                {
                    console.log(error.message)
                }
            case 'payment after delivery':
                try
                {   
                    await newOrder.save()

                    res.status(200).json({success:true , newOrder})

                    break;
                }
                catch(error)
                {
                    console.log(error.message)
                }
            default:
                console.log('the option selected is not maethod');

                break;
        }

    }
    catch(error)
    {
        next(error)
    }

}


export const callback = async (req,res,next) => {

    try
    {
        const callbackData = req.body

        if(!callbackData.Body.stkCallback.CallbackMetadata)
        {
            console.log(callbackData.Body)

            res.json("ok")
        }

        const phone = callbackData.Body.stkCallback.CallbackMetadata.Item[4].Value
        
        const amount = callbackData.Body.stkCallback.CallbackMetadata.Item[0].Value

        const trnx_id = callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value

        const payment = new Payment({
            phone,
            amount,
            trnx_id
        }) 

        await payment.save()

        res.status(200).json({success:true , payment})
        
    }
    catch(error)
    {
        next(error)
    }
}


export const verifyOrder = async (req,res,next) => {

    const {orderId,success} = req.body ;

    try
    {
        if(success === 'true')
        {
            await Order.findByIdAndUpdate(orderId,{payment:true})

            res.status(200).json({success:true ,message:"paid"})
        }
        else
        {
            await Order.findByIdAndDelete(orderId)

            res.json({success:false ,message:" Not paid"})
        }

    }
    catch(error)
    {
        next(error)
    }
}


export const adminOrders = async (req,res,next) => {

    try
    {
        const orders = await Order.find({})

        res.status({success:true , orders})
    }
    catch(error)
    {
        next(error)
    }
    
}


export const userOrders = async (req,res,next) => {

    const {userId} = req.body 

    try
    {
        const orders = await Order.find({userId:userId})

        res.status(200).json({success:true, orders})
    }
    catch(error)
    {
        next(error)
    }
    
}


export const updateStatus = async (req,res,next) => {

    const {orderId ,status} = req.body
    try
    {
        await Order.findByIdAndUpdate(orderId,{status:status})

        res.status(200).json({success:true ,message:"status updated"})
        
    }
    catch(error)
    {
        next(error)
    }
    
}

