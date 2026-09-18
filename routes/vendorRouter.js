const express = require("express");
const { vendorController } = require("../controllers/vendorController");

const _ = express.Router();

_.post("/create/product",vendorController);


module.exports = _;