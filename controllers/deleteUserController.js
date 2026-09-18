const User = require("../models/userSchema");

let deleteUserController = async (req, res) => {
  let { id } = req.params;

  let user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

module.exports = {
  deleteUserController,
};