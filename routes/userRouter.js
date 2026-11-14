const express = require("express");
const { userController } = require("../controllers/userController");

const _ = express.Router();

_.get("/alluser",userController);

_.post('/create/cart' , createCart)
_.post('/cart/incredecre' , increDecre)
_.get('/get/cart',getCart)

module.exports = _;
