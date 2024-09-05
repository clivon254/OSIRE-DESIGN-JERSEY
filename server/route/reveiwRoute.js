

import express from "express"
import { addReveiw, deleteReveiw, getReveiws, updateReveiw } from "../controller/reveiwController.js"
import { verifyToken } from "../utils/verifyToken.js"

const reveiwRoute = express.Router()


reveiwRoute.post('/add-reveiw/:productId', addReveiw)

reveiwRoute.get('/get-reveiws/:productId', getReveiws)

reveiwRoute.put('/update-reveiw/:productId', updateReveiw)

reveiwRoute.delete('/delete-reveiw/:productId', deleteReveiw)




export default reveiwRoute