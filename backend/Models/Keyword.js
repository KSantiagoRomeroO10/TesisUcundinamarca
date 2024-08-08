const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')
// const Video = require('./Video')

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
    IdVideoFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      // references: {
      //   model: Video,
      //   key: 'idVideo'
      // }
    }
  },
  {sequelize, modelName: 'keyword'}
)

module.exports = KeyWord
