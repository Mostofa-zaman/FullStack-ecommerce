const Categories = require("../models/categorySchema");
const SubCategories = require("../models/subCategorySchema");
const getOwnerWiseCategories = require("../utils/categorieWiseOwnerPromise");

let createCategory = async (req, res) => {
  let { name, owner } = req.body;

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
    owner: owner,
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

  let category = await Categories.findByIdAndUpdate(
    { _id: parentCategory },
    { $push: { subCategories: subCategory._id } },
    { new: true },
  );

  await subCategory.save();

  return res.status(201).json({
    success: true,
    message: "Sub category created successfully",
    data: subCategory,
  });
};

let allCategories = async (req, res) => {
  let categories = await Categories.find({}).populate({
    path: "owner",
    select: "-password",
  });

  return res.status(200).json({
    success: true,
    message: "All categories",
    data: categories,
  });
};

let allSubCategories = async (req, res) => {
  let subCategories = await SubCategories.find({}).populate("parentCategory");

  return res.status(200).json({
    success: true,
    message: "All sub categories",
    data: subCategories,
  });
};

let allCategoryWiseSubCategories = async (req, res) => {
  let { id } = req.params;

  let subCategories = await SubCategories.find({ parentCategory: id });

  return res.status(200).json({
    success: true,
    message: "All sub categories",
    data: subCategories,
  });
};

let allOwnerWiseCategories = async (req, res) => {
  try {
    const { id } = req.params;

    const value = await getOwnerWiseCategories(id);

    return res.status(200).json({
      success: true,
      message: "All categories",
      data: value,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

module.exports = {
  allCategories,
  createCategory,
  createSubCategory,
  allSubCategories,
  allCategoryWiseSubCategories,
  allOwnerWiseCategories,
};
