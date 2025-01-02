const { Model, DataTypes } = require('sequelize');
const sequelize = require('./Config/Connect');
const Keyword = require('./Keyword');

class Audio extends Model {}
Audio.init(
{
  idAudio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idKeywordFK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Keyword,
      key: 'idKeyWord'
    }
  }
},{
  sequelize, modelName: 'audio' 
})

module.exports = Audio
