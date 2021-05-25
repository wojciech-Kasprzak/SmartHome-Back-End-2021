"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Devices.belongsTo(models.Rooms, {
        foreignKey: "Rooms_ID",
      });
      Devices.belongsTo(models.States, {
        foreignKey: "States_ID",
      });
    }
  }
  Devices.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Devices",
      timestamps: true,
      paranoid: true,
    }
  );
  return Devices;
};
