'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};