

import express from "express"
import { adminOrders, callback, placeOrderAfterDelivery, placeOrderMpesa, placeOrderStripe, updateStatus, userOrders, verifyOrder } from "../controller/orderController.js"
import { generateToken, verifyToken } from "../utils/verifyToken.js"


const orderRoute = express.Router()


orderRoute.post('/place-orderMpesa' ,generateToken , placeOrderMpesa)


orderRoute.post('/place-orderStripe' , placeOrderStripe)


orderRoute.post('/place-orderAfterDelivery' , placeOrderAfterDelivery)


orderRoute.post('/callback', callback)


orderRoute.post('/verify-order', verifyOrder)


orderRoute.post('/user-order', userOrders)


orderRoute.get('/admin-order', adminOrders)


orderRoute.put('/update-status', updateStatus)




export default orderRoute