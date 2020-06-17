const jwt = require('jsonwebtoken');
const authentication = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden' });
  }
};

module.exports = authentication;
