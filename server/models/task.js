'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title silahkan diisi terlebih dahulu.',
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Category tidak boleh kosong.',
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    { sequelize }
  );
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User);
  };
  return Task;
};

