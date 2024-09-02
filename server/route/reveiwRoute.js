

import express from "express"
import { addReveiw, deleteReveiw, getReveiws, updateReveiw } from "../controller/reveiwController.js"
import { verifyToken } from "../utils/verifyToken.js"

const reveiwRoute = express.Router()


reveiwRoute.post('/add-reveiw/:productId', verifyToken, addReveiw)

reveiwRoute.get('/get-reveiws/:productId', verifyToken, getReveiws)

reveiwRoute.put('/update-reveiw/:productId', verifyToken, updateReveiw)

reveiwRoute.delete('/delete-reveiw/:productId', verifyToken, deleteReveiw)




export default reveiwRoute