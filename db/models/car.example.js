'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    no_police: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    image: DataTypes.STRING,
    price_perday: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    transmision: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};