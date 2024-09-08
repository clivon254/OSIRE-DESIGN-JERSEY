

import express from "express"
import { addToCart, removeFromCart, getCart } from "../controller/cartController.js"
import { verifyToken } from "../utils/verifyToken.js"


const cartRoute = express.Router()


cartRoute.post('/add-cart', addToCart)


cartRoute.put('/remove-cart', removeFromCart)


cartRoute.get('/get-cart', getCart)


export default cartRoute 