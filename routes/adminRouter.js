const express = require("express");

const { allUserController, singleUserController, activeUserController, deActiveUserController, updateUserController,  updateCategoryController, deleteCategoryController,  } = require("../controllers/adminController");
const { deleteUserController } = require("../controllers/deleteUserController");

const _ = express.Router();


/**
 * @swagger
 * /api/v1/admin/all-user:
 *   get:
 *     summary: Get all users
 *     description: Get information of all users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users information
 *       401:
 *         description: Unauthorized
 */
_.get("/all-user", allUserController);


/**
 * @swagger
 * /api/v1/admin/user/{id}:
 *   get:
 *     summary: Get single user
 *     description: Get information of a single user by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: User information
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

_.get("/user/:id", singleUserController);

/**
 * @swagger
 * /api/v1/admin/active/user:
 *   get:
 *     summary: Get active users
 *     description: Get all active users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active users information
 *       401:
 *         description: Unauthorized
 */
_.get("/active/user", activeUserController);


/**
 * @swagger
 * /api/v1/admin/deactive/user:
 *   get:
 *     summary: Get deactive users
 *     description: Get all deactive users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deactive users information
 *       401:
 *         description: Unauthorized
 */
_.get("/deactive/user", deActiveUserController);

/**
 * @swagger
 * /api/v1/admin/update/user/{id}:
 *   post:
 *     summary: Update user
 *     description: Update user information by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 65f123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Mostofa Zaman
 *               email:
 *                 type: string
 *                 example: mostofa@gmail.com
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - deactive
 *                 example: active
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
_.post("/update/user/:id", updateUserController);


/**
 * @swagger
 * /api/v1/admin/delete-user/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

_.delete("/delete-user/:id", deleteUserController);

/**
 * @swagger
 * /api/v1/user/update/category/{id}:
 *   post:
 *     summary: Update category
 *     description: Update category information by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *         example: 65f123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: electronics
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - deactive
 *                   - rejected
 *                 example: active
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */

_.post("/update/category/:id", updateCategoryController)


/**
 * @swagger
 * /api/v1/user/delete/category/{id}:
 *   delete:
 *     summary: Delete category
 *     description: Delete a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
_.delete("/delete/category/:id", deleteCategoryController)

module.exports = _;