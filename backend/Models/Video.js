const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

class Video extends Model {}
Video.init(
  {
    idVideo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  { sequelize, modelName: 'video' }
)

module.exports = Video
