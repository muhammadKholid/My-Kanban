const jwt = require('jsonwebtoken');

const jwtSign = (id, email, code) => {
  const token = jwt.sign(
    {
      userId: id,
      emial: email,
    },
    code
  );
  return token;
};

module.exports = jwtSign;
