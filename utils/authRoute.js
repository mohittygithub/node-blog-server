const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const header = req.header("Authorization");
  if (!header)
    return res.status(401).json({ success: false, message: "Access Denied" });

  try {
    const token = await header.split("Bearer ").pop();
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified);
    req.user = verified;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, data: null, error: "Invalid Token" });
  }
};
