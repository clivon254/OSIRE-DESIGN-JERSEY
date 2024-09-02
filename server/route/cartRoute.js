

import express from "express"
import { addToCart, removeFromCart, getCart } from "../controller/cartController.js"
import { verifyToken } from "../utils/verifyToken.js"


const cartRoute = express.Router()


cartRoute.post('/add-cart', verifyToken, addToCart)


cartRoute.put('/remove-cart',verifyToken, removeFromCart)


cartRoute.get('/get-cart',verifyToken, getCart)


export default cartRoute 