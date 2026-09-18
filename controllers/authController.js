const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendVerificationEmail,
  forgotPasswordEmail,
} = require("../utils/emailSender");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let registrationController = async (req, res) => {
  let { fullName, email, password, confirmPassword, terms } = req.body;

  let existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists",
    });
  }

  if (!fullName || !email || !password || !confirmPassword || !terms) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }
  // if(!passwordRegex.test(password)){
  //      return res.status(400).json({
  //         success:false,
  //         message:"Invalid password format"
  //     })
  // }
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  const hash = bcrypt.hashSync(password, 10);
  const newUser = new User({
    fullName: fullName,
    email: email,
    password: hash,
    terms: terms,
  });

  await newUser.save();

  let verificationToken = jwt.sign(
    {
      _id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  sendVerificationEmail(email, verificationToken);

  res.status(201).json({
    success: true,
    message: "User registration successfull",
  });
};

let loginController = async (req, res) => {
  let { email, password } = req.body;

  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "invalid credentials",
    });
  }

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  let passCompare = bcrypt.compareSync(password, existingUser.password);

  if (passCompare) {
    let accessToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        role: existingUser.role,
      },
      accessToken: accessToken,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

let verifyEmailController = async (req, res) => {
  let { token } = req.params;

  var decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  await User.findByIdAndUpdate({ _id: decoded._id }, { isVerified: true });

  res.status(200).json({
    success: true,
    messege: "email verified",
  });
};

let forgotPassword = async (req, res) => {
  let { email } = req.body;

  let existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "user not found",
    });
  }
  let resetPasswordToken = jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2m",
    },
  );

  forgotPasswordEmail(email, resetPasswordToken);
  res.status(200).json({
    success: true,
    message: "please check your email for reset password",
  });
};

let resetPassword = async (req, res) => {
  let { token } = req.params;
  let { newPassword, confirmPassword } = req.body;

  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  let statusCode = 200;
  let success = true;
  let message = "";

  if (decoded) {
    if (newPassword == confirmPassword) {
      const hash = bcrypt.hashSync(newPassword, 10);

      await User.findByIdAndUpdate({ _id: decoded._id }, { password: hash });

      message = "password updated";
    } else {
      statusCode = 400;
      success = false;
      message = "password not match";
    }
  } else {
    statusCode = 400;
    success = false;
    message = "invalid token";
  }

  return res.status(statusCode).json({
    success: success,
    massege: message,
  });
};

module.exports = {
  registrationController,
  loginController,
  verifyEmailController,
  forgotPassword,
  resetPassword,
};
