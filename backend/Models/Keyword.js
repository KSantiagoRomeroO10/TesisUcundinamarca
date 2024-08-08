const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

class KeyWord extends Model{}
KeyWord.init({
    idKeyWord: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    keyWord: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IdAudioFK: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    IdVideoFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  },
  {sequelize, modelName: 'keyword'}
)

module.exports = KeyWord
