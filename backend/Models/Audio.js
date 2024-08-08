const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

class Audio extends Model {}
Audio.init(
  {
    idAudio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    audio: {
      type: DataTypes.BLOB,
      allowNull: false      
    }
  },
  { sequelize, modelName: 'audio' }
)

module.exports = Audio
