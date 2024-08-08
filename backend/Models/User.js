const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

class User extends Model{}
User.init({
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {sequelize, modelName: 'user'}
)

module.exports = User
