const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

  const token = req.cookies?.token;
  if (!token) return res.status(400).json({ msg: "user not authenticated" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded)
      return res.status(400).json({ msg: "user not authenticated", error: true });
    req.body.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("error from verifyToken in middleware", err);
    res.json({ msg: "error from verify token in middleware", error: true });
  }
};

module.exports = verifyToken;
