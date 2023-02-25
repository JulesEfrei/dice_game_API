const jwt = require("jsonwebtoken");

require("dotenv").config();

//Verify Token
verifyToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(403).send({ message: "No token provided!" });
  }

  let token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
