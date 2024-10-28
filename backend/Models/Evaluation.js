const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

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
    }
  },
  { sequelize, modelName: 'Evaluation' }
)

module.exports = Evaluation
