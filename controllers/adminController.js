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

const deActiveUserController = async (req,res) => {

    let data = await User.find({status : 'deactive'})
    res.status(200).json({
        success : true,
        message : `Deactive user information`,
        data : data
    })
}

const updateUserController = async (req,res) => {
    
    let {id} = req.params

    await User.findByIdAndUpdate({_id:id},req.body,{new:true})
    res.status(200).json({
        success : true,
        message : "User updated successfully"
    })
}

const updateCategory = async (req, res) => {
  let { id } = req.params;

  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase();
  }

  let updatedCategory = await Categories.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );

  if (!updatedCategory) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
};





module.exports ={allUserController,singleUserController,activeUserController,deActiveUserController,updateUserController,}