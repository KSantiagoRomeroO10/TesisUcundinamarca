const { DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const Text = sequelize.define('Text', {
  IdEvaluation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Evaluation: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

module.exports = Text
