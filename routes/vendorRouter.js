const express = require("express");
const { createCategory, allCategories, createSubCategory,allSubCategories,allCategoryWiseSubCategories, allOwnerWiseCategories } = require("../controllers/vendorController");
const _ = express.Router();


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
_.post("/create/subcategory",createSubCategory);
_.get("/allsubcategories", allSubCategories);
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







module.exports = _;