const express = require("express");

const { allUserController } = require("../controllers/adminController");
const { deleteUserController } = require("../controllers/deleteUserController");

const _ = express.Router();

_.get("/all-user", allUserController);

_.delete("/delete-user/:id", deleteUserController);

module.exports = _;