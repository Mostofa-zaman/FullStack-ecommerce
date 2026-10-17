
const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    shortDescription:{
        type:String,
    },
    sku:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    images:[{
        url:{
            type:String
        },
        isMain:{
            type:Boolean,
            default:false
        }
    }],
    discountprice:{
        type:Number,

    },
    stock:{
        type:Number
      
    },
    status:{
        type:String,
        enum:['approved','pending','rejected'],
        default:'pending'
    },
    // brand:{
    //     type:String 
    // },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    subCategory:{
        type:Schema.Types.ObjectId,
        ref:'SubCategory'
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})

module.exports = mongoose.model('Product', productSchema)