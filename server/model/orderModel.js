

import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({

    userId:{type:String ,required:true},

    items:{type:Array, required:true},

    address:{type:Object ,required:true},

    status:{type:Object ,default:"order processing"},

    date:{type:String ,default:Date.now()},

    amount:{type:Object ,required:true},

    payment:{type:Boolean ,default:false},

    paymentmethod:{type:String ,required:true}

})


const Order = mongoose.model('Order', orderSchema)


export default Order ;