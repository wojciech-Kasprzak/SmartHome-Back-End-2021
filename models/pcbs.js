"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PCBs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PCBs.hasMany(models.Transmitters, {
        foreignKey: "PCBs_ID",
      });
    }
  }
  PCBs.init(
    {
      Name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PCBs",
    }
  );
  return PCBs;
};
