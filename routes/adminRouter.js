const express = require("express");
const { allUserController } = require("../controllers/adminController");

const _ = express.Router();

_.get("/all-user",allUserController);


module.exports = _;