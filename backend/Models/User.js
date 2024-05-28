const { DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const User = sequelize.define('User', {
  IdUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User
