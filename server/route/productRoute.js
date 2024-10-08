


import express from "express"
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/productContoller.js"
import { verifyToken } from "../utils/verifyToken.js"


const productRoute = express.Router()



productRoute.post("/add-product", addProduct)


productRoute.put("/update-product/:productId", updateProduct)


productRoute.delete("/delete-product/:productId", deleteProduct)


productRoute.get("/get-product/:productId", getProduct)


productRoute.get("/get-products", getProducts)





export default productRoute