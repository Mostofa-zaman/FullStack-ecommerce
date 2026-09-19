const express = require("express");

const { allUserController, singleUserController, activeUserController, deactiveUserController } = require("../controllers/adminController");
const { deleteUserController } = require("../controllers/deleteUserController");

const _ = express.Router();

_.get("/all-user", allUserController);
_.get("/user/:id", singleUserController);
_.get("/active/user", activeUserController);

_.delete("/delete-user/:id", deleteUserController);

module.exports = _;