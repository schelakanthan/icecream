const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    flavor1:{
        type:String, 
        required:true
    },
    flavor2:{
        type:String, 
        required:true
    },
    flavor3:{
        type:String, 
        required:true
    },
    flavor4:{
        type:String, 
        required:true
    },
    images:{
        type:Object, 
        required:true
    },
   
    checked:{
        type:Boolean, 
        default:false
    },
    sold:{
        type:Number, 
        default:0
    }
},
{timestamps:true
})


module.exports = mongoose.model("products",productSchema)