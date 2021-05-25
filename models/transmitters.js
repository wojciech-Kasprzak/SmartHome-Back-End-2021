"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transmitters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transmitters.belongsTo(models.PCBs, {
        foreignKey: "PCBs_ID",
      });
      Transmitters.belongsTo(models.Rooms, {
        foreignKey: "Rooms_ID",
      });
      Transmitters.belongsTo(models.States, {
        foreignKey: "States_ID", 
      });
    }
  }
  Transmitters.init(
    {
      Name: DataTypes.STRING,
      GPIO: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transmitters",
    }
  );
  return Transmitters;
};
