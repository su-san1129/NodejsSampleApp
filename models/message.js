'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    user_id: DataTypes.INTEGER,
    board_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    underscored: true,
  });
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};