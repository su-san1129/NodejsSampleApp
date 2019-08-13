'use strict';
module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define('board', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    underscored: true,
  });
  board.associate = function(models) {
    // associations can be defined here
  };
  return board;
};