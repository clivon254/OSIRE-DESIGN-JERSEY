



import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controller/userController.js"
import { verifyToken } from "../utils/verifyToken.js"



const userRouter = express()


userRouter.get('/get-user/:userId',verifyToken,  getUser)


userRouter.delete('/delete-user/:userId' , deleteUser)


userRouter.put('/update-user/:userId', updateUser)


userRouter.get('/get-users', getUsers)




export default userRouter 