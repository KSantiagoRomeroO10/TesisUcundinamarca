const sequelize = require('./Connect')

const Audio = require('../Audio')
const Evaluation = require('../Evaluation')
const Keyword = require('../Keyword')
const User = require('../User')
const Video = require('../Video')

Video.hasOne(Keyword, {
  foreignKey: {
    name: 'IdVideoFK',
    allowNull: false
  }
})

Keyword.belongsTo(Video, {
  foreignKey: {
    name: 'IdVideoFK',
    allowNull: false
  }
})

module.exports = sequelize
