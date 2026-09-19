const express = require("express");

const { allUserController, singleUserController } = require("../controllers/adminController");
const { deleteUserController } = require("../controllers/deleteUserController");

const _ = express.Router();

_.get("/all-user", allUserController);
_.get("/user/:id", singleUserController);

_.delete("/delete-user/:id", deleteUserController);

module.exports = _;