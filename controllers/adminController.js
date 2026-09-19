let User = require('../models/userSchema')

let allUserController =async (req,res,next)=>{
      let users =await User.find({}).select('-password')
   res.status(200).json({
    success:true,
    message:`${users.length} users found`,
    data:users
   })
}

let singleUserController = async (req,res) => {
    let {id} = req.params  
    let data = await User.findById({_id:id}).select('-password')
    res.status(200).json({
        success : true,
        message : `User information`,
        data : data
    })
}

let activeUserController = async (req,res) => {

    let data = await User.find({status : 'active'})
    res.status(200).json({
        success : true,
        message : `Active user information`,
        data : data
    })
}

let deActiveUserController = async (req,res) => {

    let data = await User.find({status : 'deactive'})
    res.status(200).json({
        success : true,
        message : `Deactive user information`,
        data : data
    })
}

let updateUserController = async (req,res) => {
    
    let {id} = req.params

    await User.findByIdAndUpdate({_id:id},req.body,{new:true})
    res.status(200).json({
        success : true,
        message : "User updated successfully"
    })
}

let updateCategoryController = async (req, res) => {
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

let deleteCategoryController = async (req, res) => {
  let { id } = req.params;

  const deletedCategory = await Categories.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res.status(404).json({
      success: false,
      message: "category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "category deleted successfully",
  });
};





module.exports ={allUserController,singleUserController,activeUserController,deActiveUserController,updateUserController,updateCategoryController,deleteCategoryController}