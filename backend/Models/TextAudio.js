const { DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const TextAudio = sequelize.define('TextAudio', {
  IdTextAudio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  TextAudio: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

module.exports = TextAudio
