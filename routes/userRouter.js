const express = require("express");
const { userController, createCategory, allCategories } = require("../controllers/userController");

const _ = express.Router();

_.post("/create/category",createCategory);
_.get("/allcategories", allCategories)


module.exports = _;