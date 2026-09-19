const express = require("express");
const { userController, createCategory } = require("../controllers/userController");

const _ = express.Router();

_.get("/product",userController);
_.post("/create/category",createCategory);


module.exports = _;