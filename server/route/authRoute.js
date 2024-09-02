

import express from "express"
import { forgotPassword, resetPassword, signin, signout, signup } from "../controller/authController.js"


const authRouter = express()


authRouter.post('/sign-in',signin)


authRouter.post('/sign-up', signup)


authRouter.post('/sign-out', signout)


authRouter.post('/forgot-password', forgotPassword)


authRouter.post('/reset-password/:token', resetPassword)



export default authRouter 