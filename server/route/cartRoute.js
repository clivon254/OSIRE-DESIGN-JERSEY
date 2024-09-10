

import express from "express"
import { addToCart, removeFromCart, getCart, increaseCart } from "../controller/cartController.js"
import { verifyToken } from "../utils/verifyToken.js"


const cartRoute = express.Router()


cartRoute.post('/add-cart', addToCart)


cartRoute.post('/increase-cart', increaseCart)


cartRoute.put('/remove-cart', removeFromCart)


cartRoute.post('/get-cart', getCart)


export default cartRoute 