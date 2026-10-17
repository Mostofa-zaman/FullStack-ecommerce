let Product = require("../models/productSchema");


const createProduct = async (req, res) => {
  let {
    title,
    shortDescription,
    description,
    price,
    brand,
    discount,
    discountPrice,
    category,
    subCategory,
    isMain,
    owner,
    stock,
  } = req.body;

  // Required field validation
  if (
    !title ||
    !description ||
    !shortDescription ||
    !price ||
    !discount ||
    !brand ||
    !category ||
    !subCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the field",
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
  if (discount < 0) {
    return res.status(400).json({
      success: false,
      message: "Discount cannot be negative.",
    });
  }
  if (stock < 0) {
    return res.status(400).json({
      success: false,
      message: "Stock cannot be negative.",
    });
  }

  // Brand validation
  if (brand !== undefined && typeof brand !== "string") {
    return res.status(400).json({
      success: false,
      message: "Brand must be a string",
    });
  }
let slug = title.toLocaleLowerCase().split(' ').join('-')

  let existingslug = await Product.findOne({ slug });

  if (existingslug) {
    return res.status(400).json({
      success: false,
      message: "slug exists",
    });
  }

  // Create SKU
  let sku = `ecom-${Date.now()}`;

  let existingSku = await Product.findOne({ sku });

  if (existingSku) {
    return res.status(400).json({
      success: false,
      message: "sku exists",
    });
  }

     let product = await new Product({
        title,
        description,
        shortDescription,
        price,
        discount,
        brand,
        category,
        subCategory,
        slug,
        sku,
        images,
        owner
    }).save()

    res.status(201).json({
        success : true,
        message : "Product Created Successfully",
        product : product
    })

}

module.exports = { createProduct };
