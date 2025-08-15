const jwt = require("jsonwebtoken");
const BlacklistedToken = require("./model/blackListToken");


async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // 1. Check if token is blacklisted
  const isBlacklisted = await BlacklistedToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ msg: "Token has been revoked" });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach useful data to request
    req.user = decoded;     // full payload (id, email, role, etc.)
    req.id = decoded.id; // just the ID for quick access

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
