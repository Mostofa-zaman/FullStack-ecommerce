
const jwt = require("jsonwebtoken");


let adminMiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  let token = authorizationToken.split(" ")[1];

  var decoded = jwt.verify(token, process.env.JWT_SECRET);

  if(decoded.role != 'admin'){
    return res.status(401).json({
        success:false,
        message:"you are not authorized"
    })
  }else{
    next()
    
  }
  console.log(decoded);
};

module.exports = { adminMiddleware };
