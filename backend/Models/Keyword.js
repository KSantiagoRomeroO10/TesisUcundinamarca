const { DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const KeyWord = sequelize.define('KeyWord', {
  IdKeyWord: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  KeyWord: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = KeyWord
