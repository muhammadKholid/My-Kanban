'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      organization: {
        type: DataTypes.STRING,
        defaultValue: 'Hacktiv8',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: {
            args: 6,
          },
          notEmpty: {
            msg: 'Password tidak boleh kosong!',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Email harus diisi!',
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeValidate: (User, options) => {
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(User.password, salt);
          User.password = hash;
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task);
  };
  return User;
};

