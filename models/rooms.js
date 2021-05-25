"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rooms.hasMany(models.Transmitters, {
        foreignKey: "Rooms_ID",
      });
    }
  }
  Rooms.init(
    {
      Name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rooms",
    }
  );
  return Rooms;
};
