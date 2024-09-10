

import express from "express"
import { applyCoupon, generateCoupon, getCoupons } from "../controller/couponController.js"


const couponRoute = express.Router()


couponRoute.post("/generate-coupon", generateCoupon)


couponRoute.post("/apply-coupon", applyCoupon)


couponRoute.get("/get-coupons", getCoupons)


export default couponRoute 