
import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

    team:{type:String ,required:true},

    status:{type:String ,required:true},

    league:{type:String ,required:true},

    season:{type:String ,required:true},

    tag:{type:String ,required:true},

    instock:{type:Number ,required:true},

    wholesale:{type:Number ,required:true},

    regularprice:{type:Number ,required:true},

    discountprice:{type:Number ,required:true},

    name:{type:String },

    number:{type:Number },

    size:{type:String },

    averageRating:{type:Number ,default:5},

    imageUrls:{type:Array , required:true}
},
 {timestamps:true})

const Product = mongoose.model('Product', productSchema)


export default Product 