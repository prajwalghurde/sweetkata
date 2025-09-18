const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ error: "Admin only" });
  next();
};

module.exports = { authenticate, authorizeAdmin };
