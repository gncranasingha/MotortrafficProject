const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

function verifyToken1(req, res, next) {
  let token1 = req.headers.authorization;
  if (!token1) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  if (token1.startsWith('Bearer ')) {
    token1 = token1.slice(7, token1.length);
  }

  jwt.verify(token1, process.env.secretkey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken1;
