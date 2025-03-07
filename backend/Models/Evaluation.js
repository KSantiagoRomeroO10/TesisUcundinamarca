const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const User = require('./User')

class Evaluation extends Model{}
Evaluation.init(
  {
    idEvaluation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    traduccion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    software:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUserFKEvaluation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'idUser'
      }
    }
  },
  { sequelize, modelName: 'Evaluation' }
)

module.exports = Evaluation
