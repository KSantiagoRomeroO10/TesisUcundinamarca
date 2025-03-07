const { Model, DataTypes } = require('sequelize');
const sequelize = require('./Config/Connect');

const User = require('./User')

class Audio extends Model {}
Audio.init(
{
  idAudio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  audioBlob: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  fileHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idUserFKAudio: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'idUser'
    }
  }
},{
  sequelize, modelName: 'Audio' 
})

module.exports = Audio
