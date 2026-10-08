const express = require("express");
const { userController } = require("../controllers/userController");

const _ = express.Router();

_.get("/alluser",userController);


module.exports = _;