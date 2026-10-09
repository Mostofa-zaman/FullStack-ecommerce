const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['active' , 'deactive' , 'rejected'] ,
        default: 'deactive'
    },
      owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        subCategories:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'SubCategories'
        }]
})

module.exports = mongoose.model("Categories", categorySchema); 