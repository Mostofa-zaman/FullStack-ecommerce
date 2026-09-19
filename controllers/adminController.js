let User = require('../models/userSchema')

let allUserController =async (req,res,next)=>{
      let users =await User.find({}).select('-password')
   res.status(200).json({
    success:true,
    message:`${users.length} users found`,
    data:users
   })
}

const singleUserController = async (req,res) => {
    let {id} = req.params  
    let data = await User.findById({_id:id}).select('-password')
    res.status(200).json({
        success : true,
        message : `User information`,
        data : data
    })
}

const activeUserController = async (req,res) => {

    let data = await User.find({status : 'active'})
    res.status(200).json({
        success : true,
        message : `Active user information`,
        data : data
    })
}




module.exports ={allUserController,singleUserController,activeUserController,}