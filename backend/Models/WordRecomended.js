const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

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
    }
  },
  { sequelize, modelName: 'WordRecomended' }
)

module.exports = WordRecomended
