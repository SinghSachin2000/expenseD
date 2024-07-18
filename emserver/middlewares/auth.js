const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authenticateToken = async(req, res, next) => {
  try {
    const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token Missing' });
    }

    try {
        // Verifying the JWT using the secret key stored in environment variables
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
       
        // Storing the decoded JWT payload in the request object for further use
        req.user = decode;
    } catch (error) {
        // If JWT verification fails, return 401 Unauthorized response
        return res
            .status(401)
            .json({ success: false, message: "token is invalid" });
    }

    // If JWT is valid, move on to the next middleware or request handler
    next();
  } catch (error) {
    console.error('Error in authenticateToken middleware:', error);
    return res.status(401).json({
      success: false,
      message: 'Something Went Wrong While Validating the Token',
    });
  }
};
