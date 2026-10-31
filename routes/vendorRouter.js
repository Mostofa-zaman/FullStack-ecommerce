const express = require("express");
const { createCategory, allCategories, createSubCategory,allSubCategories,allCategoryWiseSubCategories, allOwnerWiseCategories } = require("../controllers/vendorController");
const { createProduct, allproducts, deleteProduct, categoryWiseProducts, subCategoryWiseProducts, ownerWiseProducts, bulkProductUploadController, updatePorductController} = require("../controllers/productController");
const _ = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
  let uniqueName = `ecom-${Date.now()}`
      cb(null, uniqueName + '-' + file.originalname)

  }
})

const upload = multer({ storage: storage })


/**
 * @swagger
 * /api/v1/user/create/category:
 *   post:
 *     summary: Create a new category
 *     description: Create a new product category
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category already exists
 *       401:
 *         description: Unauthorized
 */
_.post("/create/category",createCategory);

/**
 * @swagger
 * /api/v1/user/create/subcategory:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mobile Phones
 *               category:
 *                 type: string
 *                 example: 65f123456789abcdef123456
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
_.post("/create/subcategory", createSubCategory);

/**
 * @swagger
 * /api/v1/user/allsubcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All subcategories fetched successfully
 *       401:
 *         description: Unauthorized
 */
_.get("/allsubcategories", allSubCategories);

/**
 * @swagger
 * /api/v1/user/allcategorywisesubcategories/{id}:
 *   get:
 *     summary: Get subcategories by category ID
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Subcategories fetched successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
_.get("/allcategorywisesubcategories/:id", allCategoryWiseSubCategories);

_.get("/allownerwisecategories/:id", allOwnerWiseCategories);
/**
 * @swagger
 * /api/v1/user/allcategories:
 *   get:
 *     summary: Get all categories
 *     description: Get all product categories
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *       401:
 *         description: Unauthorized
 */
_.get("/allcategories", allCategories)

// product routes

_.post('/create/product', upload.array("images"),createProduct)
_.post('/single/product/update/:id', upload.single("images"),updatePorductController)
_.get("/all-products", allproducts);
_.delete("/delete-product/:id", deleteProduct);
_.get("/category-products/:id", categoryWiseProducts);
_.get("/subcategory-products/:id", subCategoryWiseProducts);
_.get("/owner-products/:id", ownerWiseProducts);

// bulk product routes


_.post('/bulk/product', upload.single("files"),bulkProductUploadController)





module.exports = _;