

import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./route/authRoute.js"
import userRouter from "./route/userRouter.js"
import productRoute from "./route/productRoute.js"
import cartRoute from "./route/cartRoute.js"
import reveiwRoute from "./route/reveiwRoute.js"

const app = express()

const PORT = process.env.PORT


app.use(cors())

app.use(express.json())

app.use(cookieParser())


// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))



// ROUTE
app.use('/api/auth', authRouter)


app.use('/api/user', userRouter)


app.use('/api/product', productRoute)


app.use('/api/cart', cartRoute)


app.use('/api/reveiw', reveiwRoute)




// api
app.use("/",(req,res) => {

    res.send("HELLO OSIRE DESIGN JERSEY")

})

// LISTENING
app.listen(PORT,() => {

    console.log(`server running on PORT ${PORT}`)
})


app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500 ;

    const message = err.message || 'internal server Error'

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})



