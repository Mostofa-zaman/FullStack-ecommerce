const Categories = require("../models/categorySchema");
const SubCategories = require("../models/subCategorySchema");

let allCategories = async (req, res) => {
  let categories = await Categories.find({});

  return res.status(200).json({
    success: true,
    message: "All categories",
    data: categories,
  });
};

let createCategory = async (req, res) => {
  let { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  const existingCategory = await Categories.findOne({
    name: name.toLowerCase(),
  });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Category already exist",
    });
  }

  let category = new Categories({
    name: name.toLowerCase(),
  });

  await category.save();

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

let createSubCategory = async (req, res) => {
  let { name, parentCategory } = req.body;

  if (!name || !parentCategory) {
    return res.status(400).json({
      success: false,
      message: "Name and parent category are required",
    });
  }

  const existingCategory = await SubCategories.findOne({
    name: name.toLowerCase(),
  });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Sub category already exist",
    });
  }

  let subCategory = new SubCategories({
    name: name.toLowerCase(),
    parentCategory: parentCategory,
  });

  await subCategory.save();

  return res.status(201).json({
    success: true,
    message: "Sub category created successfully",
    data: subCategory,
  });
};


module.exports = {
  allCategories,
  createCategory,
  createSubCategory,

};