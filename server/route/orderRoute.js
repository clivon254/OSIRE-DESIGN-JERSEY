

import express from "express"
import { adminOrders, callback, placeOrder, updateStatus, userOrders } from "../controller/orderController"
import { verify } from "jsonwebtoken"
import { generateToken, verifyToken } from "../utils/verifyToken"


const orderRoute = express.Router()


orderRoute.post('/place-order', verifyToken ,generateToken , placeOrder)


orderRoute.post('/callback', callback)


orderRoute.post('/verify-order', verify)


orderRoute.get('/user-order', userOrders)


orderRoute.get('/admin-order', adminOrders)


orderRoute.put('/update-status', updateStatus)


orderRoute.post('/place-order', placeOrder)


export default orderRoute