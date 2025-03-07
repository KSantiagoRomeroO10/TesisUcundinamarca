const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const User = require('./User')

class Video extends Model {}
Video.init(
{
  idVideo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  videoBlob: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  fileHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idUserFKVideo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'idUser'
    }
  }
},{ 
  sequelize, modelName: 'Video' 
})

module.exports = Video
