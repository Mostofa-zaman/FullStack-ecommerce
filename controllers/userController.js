const Categories = require("../models/categorySchema");

let  allCategories = async (req,res) => {
    let categories = await Categories.find({})
    return res.status(200).json({
        success : true,
        message : "All categories",
        data : categories
    })
}
let createCategory = async (req, res) => {
  let { name } = req.body;

  const existingCategory = await Categories.findOne({
    name: name.toLowerCase(),
  });
  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Category already exist",
    });
  }

  let categories = new Categories({
    name: name.toLowerCase(),
  });
  categories.save();
  res.status(201).json({
    success: false,
    message: " create Category ",
  });

  const admin = await User.findOne({ role: "admin" });
  if (admin) {
    await notifyAdminEmail(admin.email, name);
  }

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
  });
};

module.exports = { allCategories, createCategory };
