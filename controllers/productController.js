let Product = require('../models/productSchema')

const createProduct = async (req, res) => {
  const {
    title, shortDescription,description,price,brand,discountPrice,category, subCategory,
  } = req.body;

   // Required field validation
  if (
    !title ||
    price === undefined ||
    price === null ||
    price === "" ||
    !category ||
    !subCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Title, price, category and subCategory are required",
    });
  }

    // Title validation
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title must be a valid string",
    });
  }

// Price validation
if (isNaN(price) || Number(price) < 0) {
  return res.status(400).json({
    success: false,
    message: "Price must be a valid  number",
  });
}

// Brand validation
if (brand !== undefined && typeof brand !== "string") {
  return res.status(400).json({
    success: false,
    message: "Brand must be a string",
  });
}

};

const slug = title.toLowercase().split(' ').join('-')

const existingslug = await Product.findOne({slug: slug})

if(existingslug){
  return res.status(400).json({
    success:false,
    message:'slug exists'
  })
}


module.exports = { createProduct}
