const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, "assignment", (err, result) => {
      if (err) res.status(401).json("Token is non Valid");
      req.user = result;
      next();
    });
  } else {
    res.status(401).json({ message: "You are not Authorized" });
  }
};

const verifyUserAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userID === req.params.id || req.user.isAdmin === "admin") {
      next();
    } else {
      res.status(403).json({ message: "You are not Authorized to do that" });
    }
  });
};

module.exports = {
  verifyUserAndAuthorization,
};
