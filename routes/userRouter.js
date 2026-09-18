const express = require("express");
const { userController } = require("../controllers/userController");

const _ = express.Router();

_.get("/product",userController);


module.exports = _;