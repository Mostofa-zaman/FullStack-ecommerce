const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  terms: {
    type: Boolean,
    required: true,
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },
  status:{
    type:String,
    enum:['active','inactive'],
    default:'active'
  },
  isVerified:{
    type:Boolean,
    default:false
  }
});
 
module.exports= mongoose.model("user",userSchema)