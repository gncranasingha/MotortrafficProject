const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

function verifyToken(req, res, next) {
  // Try to get the token from the Authorization header
  let token = req.headers.authorization;

  // Check if the token was provided in the header
  if (!token) {
    // If not, return an error response
    return res.status(403).json({ message: 'Token not provided' });
  }

  // If the token comes with 'Bearer ' prefix, remove it to get the actual token
  if (token.startsWith('Bearer ')) {
    // Remove "Bearer " from beginning of the token
    token = token.slice(7, token.length);
  }

  // Now we verify the token
  jwt.verify(token, process.env.secretkey, (err, decoded) => {
    if (err) {
      // If token is invalid or expired, return an unauthorized status
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // If token is valid, attach the decoded user information to the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  });
}

module.exports = verifyToken;
