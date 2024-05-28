const { DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const Audio = sequelize.define('Audio', {
  IdAudio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Audio: {
    type: DataTypes.BLOB,
    allowNull: false
  }
})

module.exports = Audio
