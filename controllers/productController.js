let Product = require("../models/productSchema");

const readSheet = require('read-excel-file/node')

const schema = {
  title: {
    column: "title",
    type: String,
  },
  description: {
    column: "description",
    type: String,
  },
  shortDescription: {
    column: "shortDescription",
    type: String,
  },
  price: {
    column: "price",
    type: Number,
  },
  discountPrice: {
    column: "discountPrice",
    type: Number,
  },
  images: {
    column: "images",
    type: String,
  },
  stock: {
    column: "stock",
    type: Number,
  },
  status: {
    column: "status",
    type: String,
  },
};


// ========================================

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


if (price <= 0) {
  return res.status(400).json({
    success: false,
    message: "Please enter a price greater than zero."
  });
}

  if (discountPrice < 0) {
  return res.status(400).json({
    success: false,
    message: "Discount price cannot be less than zero."
  });
}
if (stock < 0) {
  return res.status(400).json({
    success: false,
    message: "Stock must be zero or greater.",
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

const allproducts = async (req, res) => {
    try {
        let allProducts = await Product.find({}).populate(['category', 'subCategory' , 'owner'])

        return res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            count: allProducts.length,
            product: allProducts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const categoryWiseProducts = async (req, res) => {
    try {
        const { id } = req.params;

        let products = await Product.find({ category: id })

        return res.status(200).json({
            success: true,
            message: "Category  products fetched successfully",
            count: products.length,
            product: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const subCategoryWiseProducts = async (req, res) => {
    try {
        const { id } = req.params;

        let products = await Product.find({ subCategory: id })

        return res.status(200).json({
            success: true,
            message: "Sub Category  products fetched successfully",
            count: products.length,
            product: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const ownerWiseProducts = async (req, res) => {
    try {
        const { id } = req.params;

        let products = await Product.find({ owner: id })

        return res.status(200).json({
            success: true,
            message: "Owner wise products fetched successfully",
            count: products.length,
            product: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// upload bulk product

const bulkProductUploadController = async (req, res) => {

    const { objects, errors } = await readSheet(req.file.path, { schema });

    if (errors) {
        return res.status(400).json({
            success: false,
            message: "Excel format error! Please check your file.",
            errors: errors
        });
    }

    const products = objects.map((product) => {
        return {
            ...product,
            slug: product.slug
                ? product.slug
                : product.title.toLowerCase().split(" ").join("-"),
            sku: product.sku
                ? product.sku
                : `eco-${product.title.substring(0, 4)}-${Date.now()}`,
            images: [
                {
                    url: product.images,
                    isMain: product['image.isMain'] === true || product['image.isMain'] === 'TRUE' || product['image.isMain'] === 1
                }
            ]
        };
    });

    console.log(products);

    await Product.insertMany(products);

    return res.status(201).json({
        success: true,
        message: "All products uploaded successfully"
    });
};

module.exports = { createProduct , allproducts , deleteProduct ,categoryWiseProducts,subCategoryWiseProducts ,ownerWiseProducts, bulkProductUploadController };