const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const User = require('./User')

class WordRecomended extends Model {}
WordRecomended.init(
  {
    idWord: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idUserFKWR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'idUser'
      }
    }
  },
  { sequelize, modelName: 'WordRecomended' }
)

module.exports = WordRecomended
