const { Task } = require('../models');

const authorization = (req, res, next) => {
  Task.findOne({
    where: {
      UserId: req.userId,
    },
  })
    .then((data) => {
      if (data.UserId == req.userId) {
        next();
      } else {
        throw new Error('Access denied!');
      }
    })
    .catch(next);
};

module.exports = authorization;
