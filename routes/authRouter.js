const express = require("express");

const {
  registrationController,
  loginController,
  verifyEmailController,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const _ = express.Router();

_.post("/registration", registrationController);

_.post("/login", loginController);

_.post("/verify/:token", verifyEmailController);

_.post("/forgot-password", forgotPassword);

_.post("/reset-password/:token", resetPassword);

module.exports = _;