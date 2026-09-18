const express = require("express");
const { adminController } = require("../controllers/adminController");

const _ = express.Router();

_.post("/delete/vendor",adminController);


module.exports = _;