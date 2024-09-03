

import express from "express"
import { adminOrders, callback, placeOrder, updateStatus, userOrders, verifyOrder } from "../controller/orderController.js"
import { generateToken, verifyToken } from "../utils/verifyToken.js"


const orderRoute = express.Router()


orderRoute.post('/place-order', verifyToken ,generateToken , placeOrder)


orderRoute.post('/callback', callback)


orderRoute.post('/verify-order', verifyOrder)


orderRoute.get('/user-order', userOrders)


orderRoute.get('/admin-order', adminOrders)


orderRoute.put('/update-status', updateStatus)


orderRoute.post('/place-order', placeOrder)


export default orderRoute