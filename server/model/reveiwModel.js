


import mongoose from "mongoose"

const reveiwSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    content:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Reveiw = mongoose.model("Reveiw",reveiwSchema)


export default Reveiw 
