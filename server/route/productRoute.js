


import express from "express"
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/productContoller.js"
import { verifyToken } from "../utils/verifyToken.js"


const productRoute = express.Router()



productRoute.post("/add-product", verifyToken, addProduct)


productRoute.put("/update-product/:productId", verifyToken, updateProduct)


productRoute.delete("/delete-product/:productId", verifyToken, deleteProduct)


productRoute.get("/get-product/:productId", getProduct)


productRoute.get("/get-products", getProducts)





export default productRoute