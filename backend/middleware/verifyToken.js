const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config()

function verifyToken(req, res, next) {
  const token = req.headers.authorization; // Assuming you send the token in the 'Authorization' header
 
   if (!token) {
    // Check if the token is stored in sessionStorage
    token = sessionStorage.getItem('token');

    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
  }

  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach the decoded user information to the request object for use in subsequent middleware or routes
    req.user = decoded;

   



    next();
  });
}

module.exports = verifyToken;
