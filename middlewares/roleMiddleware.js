const jwt = require("jsonwebtoken");

let adminMiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  let token = authorizationToken.split(" ")[1];

  var decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role != "admin") {
    return res.status(401).json({
      success: false,
      message: "you are not authorized",
    });
  } else {
    next();
  }
};

let vendorMiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  let token = authorizationToken.split(" ")[1];

  var decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "vendor" && decoded.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "you are not authorized",
    });
  } else {
    next();
  }
};

let userMiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;
  if(!authorizationToken){
      return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  let token = authorizationToken.split(" ")[1];

  var decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  } else {
    next();
  }
};

module.exports = { adminMiddleware, vendorMiddleware ,userMiddleware};
