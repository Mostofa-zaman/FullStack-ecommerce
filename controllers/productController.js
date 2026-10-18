
let Product = require("../models/productSchema");


const createProduct = async (req, res) => {
  let {
    title,
    shortDescription,
    description,
    price,
    brand,
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
    !discountPrice ||
    !brand ||
    !category ||
    !subCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the field",
    });
  }
  
let images = []

req.files.map((item, index) =>{
  images.push({
    url:item.path,
    isMain:images == isMain ? true : false
  })
})


  if (isNaN(price) || Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a valid  number",
    });
  }

  if (stock < 0) {
    return res.status(400).json({
      success: false,
      message: "Stock cannot be negative.",
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
        slug,
        sku,
        description,
        shortDescription,
        price,
        discountPrice,
        brand,
        category,
        subCategory,
        stock,
        images,
        owner,
    }).save() 

    res.status(201).json({
        success : true,
        message : "Product Created Successfully",
        product : product
    })

}

module.exports = { createProduct };
